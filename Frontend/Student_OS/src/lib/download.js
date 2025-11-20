// src/utils/download.js
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "application/json" })
  downloadBlob(blob, filename)
}
