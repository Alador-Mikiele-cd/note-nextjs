'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<any[]>([])

  async function getData() {
    const notes = await fetch('/api/notes')
    const data = await notes.json()
    setNotes(data)
  }

  async function handle() {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, note })
    })
    setTitle('')
    setNote('')
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Notes</h1>

      <div className="flex flex-col gap-3 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Title"
          className="border-2 rounded px-3 py-2"
        />
        <input
          type="text"
          value={note}
          onChange={(e: any) => setNote(e.target.value)}
          placeholder="Note"
          className="border-2 rounded px-3 py-2"
        />
        <button
          onClick={handle}
          className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {notes.map((t: any) => (
          <div key={t._id} className="border rounded p-3">
            <h2 className="font-semibold">{t.title}</h2>
            <p className="text-gray-600">{t.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}