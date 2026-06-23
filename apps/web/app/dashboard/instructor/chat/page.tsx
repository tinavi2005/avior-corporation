'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Send, Search, MessageSquare, PlusCircle } from 'lucide-react'

const contacts = [
  { id: 1, name: 'Carlos Mamani', role: 'Estudiante', unread: 1, lastMsg: 'Profe, tengo una duda...', time: '10:15' },
  { id: 2, name: 'Grupo Meteorología', role: 'Grupo · 5 alumnos', unread: 0, lastMsg: 'Se subió la tarea.', time: 'Ayer' },
  { id: 3, name: 'Valeria Torrico', role: 'Estudiante', unread: 0, lastMsg: '¡Gracias, profesor!', time: '19 Jun' },
  { id: 4, name: 'Lic. Saavedra', role: 'Coordinadora', unread: 2, lastMsg: 'Reunión el viernes...', time: '18 Jun' },
]

type Msg = { from: 'me' | 'other'; text: string; time: string }

const mockMessages: Msg[] = [
  { from: 'other', text: 'Profe, tengo una duda sobre la tarea de cartas sinópticas.', time: '10:10' },
  { from: 'me', text: 'Claro, dime en qué tienes dudas.', time: '10:12' },
  { from: 'other', text: '¿Las cartas deben ser de la semana actual o puedo usar cualquiera?', time: '10:14' },
  { from: 'me', text: 'Deben ser de los últimos 7 días. Las encuentras en el portal de SENAMHI.', time: '10:16' },
]

export default function ChatInstructorPage() {
  const [selected, setSelected] = useState<number | null>(1)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Msg[]>(mockMessages)

  const selectedContact = contacts.find((c) => c.id === selected)

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([...messages, { from: 'me', text: message, time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }) }])
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Chat" />
        <main className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px)' }}>
          {/* Contacts */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input placeholder="Buscar..." className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d8f]" />
              </div>
              <button className="w-10 h-10 bg-[#0a3d8f] rounded-xl flex items-center justify-center hover:bg-[#072d6b] transition-all" title="Nuevo grupo">
                <PlusCircle className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <button key={contact.id} onClick={() => setSelected(contact.id)}
                  className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 text-left transition-colors ${selected === contact.id ? 'bg-blue-50 border-r-2 border-[#0a3d8f]' : ''}`}
                >
                  <div className="w-10 h-10 bg-[#0a3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm truncate">{contact.name}</p>
                      <span className="text-xs text-gray-400 shrink-0 ml-2">{contact.time}</span>
                    </div>
                    <p className="text-xs text-gray-400">{contact.role}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{contact.lastMsg}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-5 h-5 bg-[#0a3d8f] text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {contact.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          {selectedContact ? (
            <div className="flex-1 flex flex-col">
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#0a3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{selectedContact.name}</p>
                  <p className="text-xs text-gray-400">{selectedContact.role}</p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-sm rounded-2xl px-4 py-3 ${msg.from === 'me' ? 'bg-[#0a3d8f] text-white rounded-br-sm' : 'bg-white text-gray-800 shadow-sm rounded-bl-sm'}`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.from === 'me' ? 'text-white/50' : 'text-gray-400'}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white border-t border-gray-200 px-4 py-4 flex gap-3">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a3d8f]"
                />
                <button onClick={handleSend} disabled={!message.trim()} className="w-12 h-12 bg-[#0a3d8f] rounded-xl flex items-center justify-center hover:bg-[#072d6b] transition-all disabled:opacity-40">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400">Selecciona una conversación</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
