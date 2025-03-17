import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { Character, CharacterExpression } from '@/types';

interface CharacterBuilderProps {
  initialCharacter?: Character;
  onSave: (character: Character) => void;
  onCancel: () => void;
}

const EXPRESSION_TYPES = [
  'neutral',
  'happy',
  'sad',
  'angry',
  'surprised',
  'thoughtful',
  'laughing',
  'crying',
  'fearful',
  'disgusted',
];

const CharacterBuilder: React.FC<CharacterBuilderProps> = ({
  initialCharacter,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialCharacter?.name || '');
  const [description, setDescription] = useState(initialCharacter?.description || '');
  const [baseImage, setBaseImage] = useState(initialCharacter?.baseImage || '');
  const [expressions, setExpressions] = useState<CharacterExpression[]>(
    initialCharacter?.expressions || []
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'expressions'>('details');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generationPrompt, setGenerationPrompt] = useState('');

  // Generate character base image
  const generateBaseImage = useCallback(async () => {
    if (!description.trim()) {
      setErrors({ description: 'Please provide a detailed character description' });
      return;
    }

    setIsGenerating(true);
    setErrors({});

    try {
      // In a real app, this would call the AI image generation API
      // For demo purposes, we use a placeholder
      // const response = await fetch('/api/generate-character', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ description }),
      // });
      // const data = await response.json();
      // setBaseImage(data.imageUrl);

      // Simulated API response
      setTimeout(() => {
        setBaseImage('/images/placeholder-character.png');
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating character:', error);
      setErrors({ generation: 'Failed to generate character image' });
      setIsGenerating(false);
    }
  }, [description]);

  // Generate character expressions
  const generateExpression = useCallback(async (expressionType: string) => {
    if (!baseImage) {
      setErrors({ baseImage: 'Please generate a base image first' });
      return;
    }

    setIsGenerating(true);
    setErrors({});

    try {
      // In a real app, this would call the AI image generation API
      // For demo purposes, we use a placeholder
      // const response = await fetch('/api/generate-expression', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     baseImage, 
      //     characterDescription: description,
      //     expressionType 
      //   }),
      // });
      // const data = await response.json();
      
      // Simulated API response
      setTimeout(() => {
        const newExpression: CharacterExpression = {
          id: `expression-${Date.now()}`,
          name: expressionType,
          image: '/images/placeholder-expression.png',
        };
        
        // Check if this expression type already exists
        const existingIndex = expressions.findIndex(exp => exp.name === expressionType);
        
        if (existingIndex >= 0) {
          // Update existing expression
          const updatedExpressions = [...expressions];
          updatedExpressions[existingIndex] = newExpression;
          setExpressions(updatedExpressions);
        } else {
          // Add new expression
          setExpressions([...expressions, newExpression]);
        }
        
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating expression:', error);
      setErrors({ generation: 'Failed to generate expression' });
      setIsGenerating(false);
    }
  }, [baseImage, description, expressions]);

  // Delete an expression
  const deleteExpression = (expressionId: string) => {
    setExpressions(expressions.filter(exp => exp.id !== expressionId));
  };

  // Validate the character data
  const validateCharacter = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Character name is required';
    if (!description.trim()) newErrors.description = 'Character description is required';
    if (!baseImage) newErrors.baseImage = 'Base image is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save the character
  const handleSave = () => {
    if (!validateCharacter()) return;
    
    const character: Character = {
      id: initialCharacter?.id || `character-${Date.now()}`,
      name,
      description,
      baseImage,
      expressions,
      storyId: initialCharacter?.storyId || '',
      createdAt: initialCharacter?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(character);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === 'details'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('details')}
          >
            Character Details
          </button>
          <button
            className={`py-3 px-6 font-medium ${
              activeTab === 'expressions'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('expressions')}
            disabled={!baseImage}
          >
            Expressions
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'details' ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Character Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter character name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Character Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Provide a detailed description of your character's appearance, personality, and distinctive features"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Base Image
                </label>
                <button
                  onClick={generateBaseImage}
                  disabled={isGenerating}
                  className={`px-3 py-1.5 rounded text-sm ${
                    isGenerating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isGenerating ? 'Generating...' : 'Generate Image'}
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                {baseImage ? (
                  <div className="relative w-64 h-64">
                    <Image
                      src={baseImage}
                      alt={name || 'Character'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-center py-10 px-6">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2"
                      />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">
                      Click &quot;Generate Image&quot; to create your character&apos;s base image
                    </p>
                  </div>
                )}
              </div>
              {errors.baseImage && <p className="mt-1 text-sm text-red-600">{errors.baseImage}</p>}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Character Expressions</h3>
                
                <div className="relative">
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) {
                        generateExpression(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    className="appearance-none block w-48 pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    disabled={isGenerating}
                  >
                    <option value="">Generate expression...</option>
                    {EXPRESSION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              {isGenerating && (
                <div className="flex justify-center py-8">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-gray-700">Generating expression...</span>
                </div>
              )}
              
              {expressions.length === 0 && !isGenerating ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">
                    No expressions yet. Use the dropdown above to generate expressions.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {expressions.map((exp) => (
                    <div
                      key={exp.id}
                      className="border border-gray-200 rounded-lg p-2 relative group"
                    >
                      <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={exp.image}
                          alt={exp.name}
                          width={150}
                          height={150}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {exp.name}
                        </span>
                        <button
                          onClick={() => deleteExpression(exp.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete expression"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.generation && (
                <p className="mt-4 text-sm text-red-600">{errors.generation}</p>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Custom Prompt</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generationPrompt}
                  onChange={(e) => setGenerationPrompt(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter custom prompt for expression generation"
                />
                <button
                  onClick={() => {
                    if (generationPrompt.trim()) {
                      generateExpression(generationPrompt.trim());
                      setGenerationPrompt('');
                    }
                  }}
                  disabled={isGenerating || !generationPrompt.trim()}
                  className={`px-4 py-2 rounded ${
                    isGenerating || !generationPrompt.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Generate
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Use this to generate expressions not in the predefined list
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500"
            disabled={isGenerating}
          >
            Save Character
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterBuilder; 