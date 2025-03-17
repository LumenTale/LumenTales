import React, { useState, useEffect } from 'react';
import { Choice, StoryNode, StoryCondition } from '@/types';

interface ChoiceEditorProps {
  choice?: Choice;
  storyNodes: StoryNode[];
  onSave: (choice: Choice) => void;
  onCancel: () => void;
}

const ChoiceEditor: React.FC<ChoiceEditorProps> = ({
  choice,
  storyNodes,
  onSave,
  onCancel,
}) => {
  const [text, setText] = useState(choice?.text || '');
  const [nextNodeId, setNextNodeId] = useState(choice?.nextNodeId || '');
  const [isPremium, setIsPremium] = useState(choice?.isPremium || false);
  const [tokenCost, setTokenCost] = useState<number | undefined>(choice?.tokenCost);
  const [conditions, setConditions] = useState<StoryCondition[]>(choice?.conditions || []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConditionForm, setShowConditionForm] = useState(false);
  const [conditionType, setConditionType] = useState<'item' | 'stat' | 'choice' | 'payment'>('item');
  const [conditionTarget, setConditionTarget] = useState('');
  const [conditionOperation, setConditionOperation] = useState<'=' | '!=' | '>' | '<' | '>=' | '<='>('=');
  const [conditionValue, setConditionValue] = useState<string>('');

  // Reset form when choice changes
  useEffect(() => {
    if (choice) {
      setText(choice.text);
      setNextNodeId(choice.nextNodeId);
      setIsPremium(choice.isPremium);
      setTokenCost(choice.tokenCost);
      setConditions(choice.conditions || []);
    } else {
      setText('');
      setNextNodeId('');
      setIsPremium(false);
      setTokenCost(undefined);
      setConditions([]);
    }
  }, [choice]);

  // Update token cost when premium status changes
  useEffect(() => {
    if (!isPremium) {
      setTokenCost(undefined);
    } else if (tokenCost === undefined) {
      setTokenCost(1); // Default token cost
    }
  }, [isPremium, tokenCost]);

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!text.trim()) {
      newErrors.text = 'Choice text is required';
    }

    if (!nextNodeId) {
      newErrors.nextNodeId = 'Next node is required';
    }

    if (isPremium && (tokenCost === undefined || tokenCost <= 0)) {
      newErrors.tokenCost = 'Premium choices require a token cost greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedChoice: Choice = {
      id: choice?.id || `choice-${Date.now()}`,
      text,
      nextNodeId,
      isPremium,
      ...(tokenCost !== undefined && { tokenCost }),
      ...(conditions.length > 0 && { conditions }),
    };

    onSave(updatedChoice);
  };

  // Add a new condition
  const handleAddCondition = () => {
    // Validate condition form
    if (!conditionTarget.trim() || !conditionValue.trim()) {
      return;
    }

    const newCondition: StoryCondition = {
      id: `condition-${Date.now()}`,
      type: conditionType,
      target: conditionTarget,
      operation: conditionOperation,
      value: conditionType === 'stat' ? Number(conditionValue) : conditionValue,
    };

    setConditions([...conditions, newCondition]);
    
    // Reset condition form
    setConditionType('item');
    setConditionTarget('');
    setConditionOperation('=');
    setConditionValue('');
    setShowConditionForm(false);
  };

  // Remove a condition
  const handleRemoveCondition = (conditionId: string) => {
    setConditions(conditions.filter(c => c.id !== conditionId));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {choice ? 'Edit Choice' : 'Add New Choice'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Choice Text */}
        <div>
          <label htmlFor="choice-text" className="block text-sm font-medium text-gray-700 mb-1">
            Choice Text
          </label>
          <input
            id="choice-text"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="What the player will see as an option"
          />
          {errors.text && <p className="mt-1 text-sm text-red-600">{errors.text}</p>}
        </div>

        {/* Next Node */}
        <div>
          <label htmlFor="next-node" className="block text-sm font-medium text-gray-700 mb-1">
            Next Node
          </label>
          <select
            id="next-node"
            value={nextNodeId}
            onChange={(e) => setNextNodeId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select a node</option>
            {storyNodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.content.substring(0, 40)}...
              </option>
            ))}
            <option value="new">Create a new node</option>
          </select>
          {errors.nextNodeId && <p className="mt-1 text-sm text-red-600">{errors.nextNodeId}</p>}
        </div>

        {/* Premium Choice */}
        <div className="flex items-center">
          <input
            id="premium-choice"
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="premium-choice" className="ml-2 block text-sm text-gray-700">
            Premium Choice (requires tokens)
          </label>
        </div>

        {/* Token Cost */}
        {isPremium && (
          <div>
            <label htmlFor="token-cost" className="block text-sm font-medium text-gray-700 mb-1">
              Token Cost
            </label>
            <input
              id="token-cost"
              type="number"
              min="1"
              value={tokenCost || ''}
              onChange={(e) => setTokenCost(parseInt(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Number of tokens required"
            />
            {errors.tokenCost && <p className="mt-1 text-sm text-red-600">{errors.tokenCost}</p>}
          </div>
        )}

        {/* Conditions Section */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-gray-700">Conditions</h3>
            <button
              type="button"
              onClick={() => setShowConditionForm(!showConditionForm)}
              className="text-sm flex items-center text-purple-600 hover:text-purple-800"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Condition
            </button>
          </div>

          {/* Condition Form */}
          {showConditionForm && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="condition-type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="condition-type"
                    value={conditionType}
                    onChange={(e) => setConditionType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="item">Item</option>
                    <option value="stat">Stat</option>
                    <option value="choice">Previous Choice</option>
                    <option value="payment">Payment</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="condition-target" className="block text-sm font-medium text-gray-700 mb-1">
                    Target
                  </label>
                  <input
                    id="condition-target"
                    type="text"
                    value={conditionTarget}
                    onChange={(e) => setConditionTarget(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder={conditionType === 'item' ? 'Item ID' : conditionType === 'stat' ? 'Stat name' : 'Choice ID'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="condition-operation" className="block text-sm font-medium text-gray-700 mb-1">
                    Operation
                  </label>
                  <select
                    id="condition-operation"
                    value={conditionOperation}
                    onChange={(e) => setConditionOperation(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="=">=</option>
                    <option value="!=">!=</option>
                    {conditionType === 'stat' && (
                      <>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value=">=">&gt;=</option>
                        <option value="<=">&lt;=</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="condition-value" className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    id="condition-value"
                    type={conditionType === 'stat' ? 'number' : 'text'}
                    value={conditionValue}
                    onChange={(e) => setConditionValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder={conditionType === 'stat' ? 'Numeric value' : 'Value'}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowConditionForm(false)}
                  className="mr-2 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCondition}
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Conditions List */}
          {conditions.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {conditions.map((condition) => (
                <li key={condition.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      {condition.type.charAt(0).toUpperCase() + condition.type.slice(1)}:
                    </span>{' '}
                    <span className="text-sm text-gray-600">
                      {condition.target} {condition.operation} {condition.value.toString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCondition(condition.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 mb-4">No conditions added yet.</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Save Choice
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChoiceEditor; 