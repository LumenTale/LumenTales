import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { Story, StoryNode, Choice } from '@/types';

interface StoryEditorProps {
  initialStory?: Story;
  isEditing?: boolean;
}

const StoryEditor: React.FC<StoryEditorProps> = ({ 
  initialStory,
  isEditing = false
}) => {
  const router = useRouter();
  const { user } = useAuth();
  
  // Story metadata state
  const [title, setTitle] = useState(initialStory?.title || '');
  const [description, setDescription] = useState(initialStory?.description || '');
  const [coverImage, setCoverImage] = useState(initialStory?.coverImage || '');
  const [genre, setGenre] = useState<string[]>(initialStory?.genre || []);
  const [tags, setTags] = useState<string[]>(initialStory?.tags || []);
  const [published, setPublished] = useState(initialStory?.published || false);
  
  // Nodes state (for branching narrative)
  const [nodes, setNodes] = useState<StoryNode[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  
  // Token settings
  const [tokenPrice, setTokenPrice] = useState<number | undefined>(initialStory?.tokenPrice);
  const [royaltyPercentage, setRoyaltyPercentage] = useState<number>(5); // Default 5%
  
  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle genre input
  const handleGenreInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newGenre = e.currentTarget.value.trim();
      if (!genre.includes(newGenre)) {
        setGenre([...genre, newGenre]);
      }
      e.currentTarget.value = '';
    }
  };
  
  // Handle tags input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      const newTag = e.currentTarget.value.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      e.currentTarget.value = '';
    }
  };
  
  // Add a new node
  const addNode = () => {
    const newNode: StoryNode = {
      id: `node-${Date.now()}`,
      storyId: initialStory?.id || '',
      content: '',
      choices: [],
      isEnding: false,
      isPremium: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setNodes([...nodes, newNode]);
    setCurrentNodeId(newNode.id);
  };
  
  // Update a node
  const updateNode = (updatedNode: StoryNode) => {
    setNodes(nodes.map(node => node.id === updatedNode.id ? updatedNode : node));
  };
  
  // Add a choice to the current node
  const addChoice = () => {
    if (!currentNodeId) return;
    
    const currentNode = nodes.find(node => node.id === currentNodeId);
    if (!currentNode) return;
    
    const newChoice: Choice = {
      id: `choice-${Date.now()}`,
      text: '',
      nextNodeId: '',
      isPremium: false,
    };
    
    const updatedNode = {
      ...currentNode,
      choices: [...currentNode.choices, newChoice],
      updatedAt: new Date().toISOString(),
    };
    
    updateNode(updatedNode);
  };
  
  // Update a choice
  const updateChoice = (nodeId: string, choiceId: string, updatedChoice: Partial<Choice>) => {
    const node = nodes.find(node => node.id === nodeId);
    if (!node) return;
    
    const updatedNode = {
      ...node,
      choices: node.choices.map(choice => 
        choice.id === choiceId ? { ...choice, ...updatedChoice } : choice
      ),
      updatedAt: new Date().toISOString(),
    };
    
    updateNode(updatedNode);
  };
  
  // Validate the story
  const validateStory = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!coverImage.trim()) newErrors.coverImage = 'Cover image is required';
    if (genre.length === 0) newErrors.genre = 'At least one genre is required';
    if (nodes.length === 0) newErrors.nodes = 'Your story needs at least one node';
    
    // Check if each node has content
    nodes.forEach(node => {
      if (!node.content.trim()) {
        newErrors[`node-${node.id}`] = 'Node content cannot be empty';
      }
      
      // If the node isn't an ending, it should have at least one choice
      if (!node.isEnding && node.choices.length === 0) {
        newErrors[`node-choices-${node.id}`] = 'Non-ending nodes must have at least one choice';
      }
      
      // Check that all choices have text and next nodes (except for ending nodes)
      node.choices.forEach(choice => {
        if (!choice.text.trim()) {
          newErrors[`choice-text-${choice.id}`] = 'Choice text cannot be empty';
        }
        if (!node.isEnding && !choice.nextNodeId) {
          newErrors[`choice-next-${choice.id}`] = 'Choice must lead to a next node';
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Save the story
  const saveStory = async () => {
    if (!validateStory()) return;
    
    // In a real app, this would save the story data to a backend
    console.log('Saving story:', {
      title,
      description,
      coverImage,
      genre,
      tags,
      published,
      nodes,
      tokenPrice,
      royaltyPercentage,
    });
    
    // Navigate back to dashboard
    router.push('/dashboard');
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Story' : 'Create New Story'}
      </h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Story Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter story title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter cover image URL"
            />
            {errors.coverImage && <p className="mt-1 text-sm text-red-600">{errors.coverImage}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter story description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genres (press Enter to add)
            </label>
            <input
              type="text"
              onKeyDown={handleGenreInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add a genre and press Enter"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {genre.map((g) => (
                <span
                  key={g}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm flex items-center"
                >
                  {g}
                  <button
                    onClick={() => setGenre(genre.filter(item => item !== g))}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            {errors.genre && <p className="mt-1 text-sm text-red-600">{errors.genre}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (press Enter to add)
            </label>
            <input
              type="text"
              onKeyDown={handleTagInput}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Add a tag and press Enter"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    onClick={() => setTags(tags.filter(item => item !== tag))}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token Price (LUMEN)
            </label>
            <input
              type="number"
              value={tokenPrice || ''}
              onChange={(e) => setTokenPrice(e.target.value ? Number(e.target.value) : undefined)}
              min="0"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter token price (optional)"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Royalty Percentage
            </label>
            <input
              type="number"
              value={royaltyPercentage}
              onChange={(e) => setRoyaltyPercentage(Number(e.target.value))}
              min="0"
              max="20"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter royalty percentage"
            />
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
              Publish story (make it visible to readers)
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Story Nodes</h2>
          <button
            onClick={addNode}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Add Node
          </button>
        </div>
        
        {nodes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No nodes yet. Click "Add Node" to start building your story.</p>
            {errors.nodes && <p className="mt-1 text-sm text-red-600">{errors.nodes}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Node navigation */}
            <div className="flex flex-wrap gap-2 mb-4">
              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setCurrentNodeId(node.id)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentNodeId === node.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {node.content.slice(0, 20)}...
                  {node.isEnding && ' (Ending)'}
                </button>
              ))}
            </div>
            
            {/* Current node editor */}
            {currentNodeId && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium mb-3">Edit Node</h3>
                
                {/* Node content */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Node Content
                  </label>
                  <textarea
                    value={nodes.find(n => n.id === currentNodeId)?.content || ''}
                    onChange={(e) => {
                      const node = nodes.find(n => n.id === currentNodeId);
                      if (node) {
                        updateNode({
                          ...node,
                          content: e.target.value,
                        });
                      }
                    }}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter the story text for this node"
                  />
                  {errors[`node-${currentNodeId}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`node-${currentNodeId}`]}</p>
                  )}
                </div>
                
                {/* Node options */}
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isEnding"
                      checked={nodes.find(n => n.id === currentNodeId)?.isEnding || false}
                      onChange={(e) => {
                        const node = nodes.find(n => n.id === currentNodeId);
                        if (node) {
                          updateNode({
                            ...node,
                            isEnding: e.target.checked,
                          });
                        }
                      }}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="isEnding" className="ml-2 block text-sm text-gray-700">
                      Is this an ending node?
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPremium"
                      checked={nodes.find(n => n.id === currentNodeId)?.isPremium || false}
                      onChange={(e) => {
                        const node = nodes.find(n => n.id === currentNodeId);
                        if (node) {
                          updateNode({
                            ...node,
                            isPremium: e.target.checked,
                          });
                        }
                      }}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="isPremium" className="ml-2 block text-sm text-gray-700">
                      Is this a premium node?
                    </label>
                  </div>
                  
                  {nodes.find(n => n.id === currentNodeId)?.isPremium && (
                    <div className="flex items-center">
                      <label htmlFor="tokenCost" className="block text-sm text-gray-700 mr-2">
                        Token Cost:
                      </label>
                      <input
                        type="number"
                        id="tokenCost"
                        value={nodes.find(n => n.id === currentNodeId)?.tokenCost || 0}
                        onChange={(e) => {
                          const node = nodes.find(n => n.id === currentNodeId);
                          if (node) {
                            updateNode({
                              ...node,
                              tokenCost: Number(e.target.value),
                            });
                          }
                        }}
                        min="0"
                        step="0.1"
                        className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
                
                {/* Choices */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium">Choices</h4>
                    <button
                      onClick={addChoice}
                      className="px-2 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Add Choice
                    </button>
                  </div>
                  
                  {nodes.find(n => n.id === currentNodeId)?.choices.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm">
                      <p>No choices yet. Add choices to continue the story.</p>
                      {errors[`node-choices-${currentNodeId}`] && (
                        <p className="mt-1 text-sm text-red-600">{errors[`node-choices-${currentNodeId}`]}</p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {nodes.find(n => n.id === currentNodeId)?.choices.map((choice) => (
                        <div key={choice.id} className="border border-gray-200 rounded-md p-3">
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Choice Text
                            </label>
                            <input
                              type="text"
                              value={choice.text}
                              onChange={(e) => updateChoice(currentNodeId, choice.id, { text: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter choice text"
                            />
                            {errors[`choice-text-${choice.id}`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`choice-text-${choice.id}`]}</p>
                            )}
                          </div>
                          
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Next Node
                            </label>
                            <select
                              value={choice.nextNodeId}
                              onChange={(e) => updateChoice(currentNodeId, choice.id, { nextNodeId: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">-- Select next node --</option>
                              {nodes
                                .filter(node => node.id !== currentNodeId)
                                .map(node => (
                                  <option key={node.id} value={node.id}>
                                    {node.content.slice(0, 30)}...
                                  </option>
                                ))}
                            </select>
                            {errors[`choice-next-${choice.id}`] && (
                              <p className="mt-1 text-sm text-red-600">{errors[`choice-next-${choice.id}`]}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`isPremium-${choice.id}`}
                              checked={choice.isPremium}
                              onChange={(e) => updateChoice(currentNodeId, choice.id, { isPremium: e.target.checked })}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={`isPremium-${choice.id}`} className="ml-2 block text-sm text-gray-700">
                              Premium choice
                            </label>
                          </div>
                          
                          {choice.isPremium && (
                            <div className="mt-3 flex items-center">
                              <label htmlFor={`tokenCost-${choice.id}`} className="block text-sm text-gray-700 mr-2">
                                Token Cost:
                              </label>
                              <input
                                type="number"
                                id={`tokenCost-${choice.id}`}
                                value={choice.tokenCost || 0}
                                onChange={(e) => updateChoice(currentNodeId, choice.id, { tokenCost: Number(e.target.value) })}
                                min="0"
                                step="0.1"
                                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </div>
                          )}
                          
                          <button
                            onClick={() => {
                              const node = nodes.find(n => n.id === currentNodeId);
                              if (node) {
                                updateNode({
                                  ...node,
                                  choices: node.choices.filter(c => c.id !== choice.id),
                                });
                              }
                            }}
                            className="mt-3 text-sm text-red-600 hover:text-red-800"
                          >
                            Remove choice
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this node?')) {
                        setNodes(nodes.filter(node => node.id !== currentNodeId));
                        setCurrentNodeId(nodes.length > 1 ? nodes[0].id : null);
                      }
                    }}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete Node
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={saveStory}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          {isEditing ? 'Update Story' : 'Create Story'}
        </button>
      </div>
    </div>
  );
};

export default StoryEditor; 