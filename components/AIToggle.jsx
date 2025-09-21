import { useState } from 'react'
import { Menu } from '@headlessui/react'

const AITogglable = ({ buttonLabel = 'ai assistant', handleRefinement, handleGenerate }) => {
  const [refineText, setRefineText] = useState('')
  const [generateText, setGenerateText] = useState('')
  const [aiType, setAiType] = useState('closed') // 'closed' | 'refine' | 'generate'

  const refineCall = e => {
    e.preventDefault()
    if (!refineText.trim()) return
    handleRefinement({ query: refineText.trim() })
    setRefineText('')
  }

  const generateCall = e => {
    e.preventDefault()
    if (!generateText.trim()) return
    handleGenerate({ topic: generateText.trim() })
    setGenerateText('')
  }

  return (
    <div>
      {aiType === 'closed' && (
        <Menu as='div' className='relative inline-block'>
          <Menu.Button className='rounded border px-3 py-2 hover:bg-gray-50'>
            {buttonLabel} ▾
          </Menu.Button>
          <Menu.Items className='absolute left-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow'>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAiType('refine')}
                  className={`w-full rounded-lg px-3 py-2 text-left ${active ? 'bg-gray-100' : ''}`}
                >
                  search refinement
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setAiType('generate')}
                  className={`mt-1 w-full rounded-lg px-3 py-2 text-left ${active ? 'bg-gray-100' : ''}`}
                >
                  generate search text
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      )}

      {aiType !== 'closed' && (
        <div className='mt-3'>
          {aiType === 'refine' && (
            <form onSubmit={refineCall} className='space-y-2'>
              <label className='block font-medium'>enter your current query</label>
              <input
                value={refineText}
                onChange={e => setRefineText(e.target.value)}
                className='w-[360px] max-w-full rounded border px-3 py-2'
                placeholder='e.g. glioblastoma chemo resistance'
              />
              <div>
                <button type='submit' className='rounded bg-black px-3 py-2 text-white'>
                  refine search
                </button>
              </div>
            </form>
          )}

          {aiType === 'generate' && (
            <form onSubmit={generateCall} className='space-y-2'>
              <label className='block font-medium'>describe what you need</label>
              <input
                value={generateText}
                onChange={e => setGenerateText(e.target.value)}
                className='w-[360px] max-w-full rounded border px-3 py-2'
                placeholder='e.g. biomarkers for early alzheimer’s'
              />
              <div>
                <button type='submit' className='rounded bg-black px-3 py-2 text-white'>
                  generate searches
                </button>
              </div>
            </form>
          )}

          <button onClick={() => setAiType('closed')} className='mt-3 rounded border px-3 py-2'>
            close ai assistant
          </button>
        </div>
      )}
    </div>
  )
}

export default AITogglable
