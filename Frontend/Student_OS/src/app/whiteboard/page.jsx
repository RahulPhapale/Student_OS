import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function App() {
	return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      {/* Top Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-white/20">
        <Button variant="outline" asChild>
          <Link to="/home">Back</Link>
        </Button>

        <Button variant="outline">Save JSON</Button>
        <Button variant="outline">Load JSON</Button>
        <Button variant="outline">Export PNG</Button>
        <Button variant="outline" className="ml-auto px-3 py-1 ">
          Attach to Note
        </Button>
      </div>

      {/* Tldraw Editor */}
      <div className="flex-1">
        <Tldraw theme="dark" />
      </div>
    </div>
  );
}