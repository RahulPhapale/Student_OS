// src/components/whiteboard/WhiteboardToolbar.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { downloadTextFile, downloadBlob } from "@/lib/download";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function WhiteboardToolbar({
  boardRef, // ref to ExcalidrawBoard (imperative handle)
  onAttachToNote = (data) => {}, // callback to pass data back to Notes module
  className = "",
}) {
  const fileInputRef = useRef(null);

  // Save scene JSON to file (download)
  const handleSaveJSON = async () => {
    const scene = await boardRef.current.getSceneJSON();
    const text = JSON.stringify(scene, null, 2);
    downloadTextFile(text, `whiteboard-scene-${Date.now()}.json`);
  };

  // Load JSON from file input and send to boardRef.loadSceneJSON
  const handleLoadJSONFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const txt = await file.text();
      const scene = JSON.parse(txt);
      await boardRef.current.loadSceneJSON(scene);
    } catch (err) {
      console.error("Failed to load scene JSON", err);
      alert("Failed to load JSON file. See console for details.");
    } finally {
      // reset input
      e.target.value = "";
    }
  };

  // Export PNG snapshot using html2canvas
  const handleExportPNG = async () => {
    const node = boardRef.current.getDOMNode();
    if (!node) {
      alert("Whiteboard not ready for PNG export.");
      return;
    }
    // Use html2canvas to snapshot the board container
    const canvas = await html2canvas(node, {
      useCORS: true,
      scale: 2, // high-res thumbnail
      backgroundColor: null,
    });
    const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
    downloadBlob(blob, `whiteboard-${Date.now()}.png`);
  };

  // Attach to note -> provide scene JSON and PNG dataUrl (or blob)
  const handleAttachToNote = async () => {
    const scene = await boardRef.current.getSceneJSON();
    const node = boardRef.current.getDOMNode();
    let dataUrl = null;
    try {
      const canvas = await html2canvas(node, {
        useCORS: true,
        scale: 1.5,
        backgroundColor: null,
      });
      dataUrl = canvas.toDataURL("image/png");
    } catch (err) {
      console.warn("PNG generation failed, attaching JSON only", err);
    }

    // Return object via callback
    onAttachToNote({
      sceneJSON: scene,
      pngDataUrl: dataUrl, // may be null if snapshot failed
    });
  };

  return (
    <div className={`flex items-center gap-2 p-3 ${className}`}>
      <Button variant="outline" asChild>
        <Link to="/home">Back</Link>
      </Button>
      <Button onClick={handleSaveJSON} variant="outline">
        Save JSON
      </Button>

      <Button onClick={() => fileInputRef.current?.click()} variant="outline">
        Load JSON
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleLoadJSONFile}
        style={{ display: "none" }}
      />

      <Button onClick={handleExportPNG} variant="outline">
        Export PNG
      </Button>

      <Button
        onClick={handleAttachToNote}
        variant="outline"
        className="ml-auto px-3 py-1 "
      >
        Attach to Note
      </Button>
    </div>
  );
}
