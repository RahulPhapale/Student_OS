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
        <h1 className='ml-auto text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>Whiteboard</h1>
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