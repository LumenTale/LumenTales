import React, { useState, useEffect } from 'react';
import { StoryNode as StoryNodeType, Choice } from '@/types';

interface StoryNodeProps {
  node: StoryNodeType;
  onUpdate: (updatedNode: StoryNodeType) => void;
  onAddChoice: (nodeId: string) => void;
  onDeleteChoice: (nodeId: string, choiceId: string) => void;
  onUpdateChoice: (nodeId: string, updatedChoice: Choice) => void;
  isStartNode?: boolean;
}

const StoryNode: React.FC<StoryNodeProps> = ({
  node,
  onUpdate,
  onAddChoice,
  onDeleteChoice,
  onUpdateChoice,
  isStartNode = false,
}) => {
  const [content, setContent] = useState(node.content);
  const [characterId, setCharacterId] = useState<string>(node.characterId || '');
  const [expression, setExpression] = useState<string>(node.expression || '');
  const [backgroundImage, setBackgroundImage] = useState<string>(node.backgroundImage || '');
  const [bgMusicUrl, setBgMusicUrl] = useState<string>(node.bgMusicUrl || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'metadata'>('content');
  const [imagePreview, setImagePreview] = useState<boolean>(false);

  // Update the node when form fields change
  useEffect(() => {
    if (isEditing) return; // Don't auto-save while editing

    const updatedNode = {
      ...node,
      content,
      characterId: characterId || null,
      expression: expression || null,
      backgroundImage: backgroundImage || null,
      bgMusicUrl: bgMusicUrl || null,
    };
    
    onUpdate(updatedNode);
  }, [content, characterId, expression, backgroundImage, bgMusicUrl, isEditing, node, onUpdate]);

  // Handle saving edits
  const handleSave = () => {
    setIsEditing(false);
    
    const updatedNode = {
      ...node,
      content,
      characterId: characterId || null,
      expression: expression || null,
      backgroundImage: backgroundImage || null,
      bgMusicUrl: bgMusicUrl || null,
    };
    
    onUpdate(updatedNode);
  };

  // Handle canceling edits
  const handleCancel = () => {
    setIsEditing(false);
    setContent(node.content);
    setCharacterId(node.characterId || '');
    setExpression(node.expression || '');
    setBackgroundImage(node.backgroundImage || '');
    setBgMusicUrl(node.bgMusicUrl || '');
  };

  return (
    <div className={`border rounded-lg mb-6 ${isStartNode ? 'border-purple-500' : 'border-gray-300'} shadow-sm`}>
      <div 
        className={`px-4 py-3 flex justify-between items-center cursor-pointer ${
          isStartNode ? 'bg-purple-50' : 'bg-gray-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <span className={`font-medium ${isStartNode ? 'text-purple-700' : 'text-gray-700'}`}>
            {isStartNode ? 'Start Node' : `Node ${node.id.substring(0, 6)}...`}
          </span>
          {node.choices && node.choices.length > 0 && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {node.choices.length} Choices
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
              setIsExpanded(true);
            }}
            className="text-gray-600 hover:text-purple-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-200">
          {isEditing ? (
            <div className="space-y-4">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-6">
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'content'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('content')}
                  >
                    Content
                  </button>
                  <button
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'metadata'
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveTab('metadata')}
                  >
                    Media & Metadata
                  </button>
                </nav>
              </div>

              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`content-${node.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Node Content
                    </label>
                    <textarea
                      id={`content-${node.id}`}
                      rows={5}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Write the story text for this node..."
                    />
                  </div>
                </div>
              )}

              {activeTab === 'metadata' && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={`character-${node.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Character
                      </label>
                      <select
                        id={`character-${node.id}`}
                        value={characterId}
                        onChange={(e) => setCharacterId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="">No Character</option>
                        {/* Here we would map through available characters */}
                        <option value="character-1">Character 1</option>
                        <option value="character-2">Character 2</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`expression-${node.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Expression
                      </label>
                      <select
                        id={`expression-${node.id}`}
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        disabled={!characterId}
                      >
                        <option value="">Default</option>
                        {/* Here we would map through available expressions for the selected character */}
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="angry">Angry</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor={`bg-${node.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Background Image
                        </label>
                        {backgroundImage && (
                          <button
                            type="button"
                            onClick={() => setImagePreview(!imagePreview)}
                            className="text-sm text-purple-600 hover:text-purple-800"
                          >
                            {imagePreview ? 'Hide Preview' : 'Show Preview'}
                          </button>
                        )}
                      </div>
                      <input
                        id={`bg-${node.id}`}
                        type="text"
                        value={backgroundImage}
                        onChange={(e) => setBackgroundImage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="URL to background image"
                      />
                      {imagePreview && backgroundImage && (
                        <div className="mt-2 relative rounded-md overflow-hidden h-40">
                          <img
                            src={backgroundImage}
                            alt="Background preview"
                            className="w-full h-full object-cover"
                            onError={() => {
                              console.error('Failed to load image');
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`music-${node.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Background Music
                      </label>
                      <input
                        id={`music-${node.id}`}
                        type="text"
                        value={bgMusicUrl}
                        onChange={(e) => setBgMusicUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="URL to background music"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <p>{content}</p>
              </div>
              
              {(characterId || backgroundImage || bgMusicUrl) && (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  {characterId && (
                    <div>
                      <span className="font-medium text-gray-700">Character:</span>{' '}
                      <span className="text-gray-600">
                        {characterId} {expression && `(${expression})`}
                      </span>
                    </div>
                  )}
                  {backgroundImage && (
                    <div>
                      <span className="font-medium text-gray-700">Background:</span>{' '}
                      <span className="text-gray-600 truncate">{backgroundImage.split('/').pop()}</span>
                    </div>
                  )}
                  {bgMusicUrl && (
                    <div>
                      <span className="font-medium text-gray-700">Music:</span>{' '}
                      <span className="text-gray-600 truncate">{bgMusicUrl.split('/').pop()}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Choices</h4>
                {node.choices && node.choices.length > 0 ? (
                  <ul className="space-y-2">
                    {node.choices.map((choice) => (
                      <li key={choice.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 mr-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{choice.text}</span>
                              {choice.conditions && choice.conditions.length > 0 && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                  Has conditions
                                </span>
                              )}
                            </div>
                            {choice.nextNodeId && (
                              <div className="text-xs text-gray-500 mt-1">
                                Links to: {choice.nextNodeId.substring(0, 6)}...
                              </div>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              onClick={() => {
                                // Here we would show a modal to edit the choice
                                const updatedChoice = {
                                  ...choice,
                                  text: 'Updated Choice', // This would be replaced with form input
                                };
                                onUpdateChoice(node.id, updatedChoice);
                              }}
                              className="p-1 text-gray-500 hover:text-purple-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => onDeleteChoice(node.id, choice.id)}
                              className="p-1 text-gray-500 hover:text-red-700"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-4 border border-dashed border-gray-300 rounded-md">
                    <p className="text-sm text-gray-500">No choices added yet</p>
                  </div>
                )}
                
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onAddChoice(node.id)}
                    className="text-sm flex items-center text-purple-600 hover:text-purple-800"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Choice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryNode; 