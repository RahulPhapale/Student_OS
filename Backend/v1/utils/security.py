
from passlib.context import CryptContext
from passlib.exc import UnknownHashError
import bcrypt as _bcrypt_pkg
from typing import Optional

# Use only bcrypt_sha256 in the CryptContext to avoid triggering passlib's
# bcrypt backend initialization which can attempt to run checks that fail
# when the local bcrypt implementation rejects long secrets during backend
# detection. We'll handle legacy bcrypt hashes manually in verify_password.
pwd_context = CryptContext(schemes=["pbkdf2_sha256", "bcrypt_sha256"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """Hash a plain password for storage using the preferred scheme."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a plain password against the stored hash (any supported scheme)."""
    # If the stored hash looks like a legacy bcrypt hash (identifiers start
    # with $2), avoid calling passlib which may attempt to initialize the
    # bcrypt backend and raise for long secrets. Instead, verify using the
    # bcrypt library directly with 72-byte truncation.
    if hashed_password and hashed_password.startswith("$2"):
        try:
            pw_bytes = plain_password.encode()[:72]
            return _bcrypt_pkg.checkpw(pw_bytes, hashed_password.encode())
        except Exception:
            return False

    # Otherwise defer to passlib's context (preferred bcrypt_sha256 scheme).
    return pwd_context.verify(plain_password, hashed_password)


def needs_rehash(hashed_password: str) -> bool:
    """Return True if the stored hash should be rehashed to the preferred scheme."""
    try:
        return pwd_context.needs_update(hashed_password)
    except UnknownHashError:
        # passlib can't identify the hash (likely a legacy bcrypt hash). In
        # that case, return True so callers will re-hash the password into
        # the preferred scheme when the user next authenticates.
        if hashed_password and hashed_password.startswith("$2"):
            return True
        # For completely unknown formats, signal no rehash required
        return False

