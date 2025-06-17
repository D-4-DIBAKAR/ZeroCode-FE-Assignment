import { PROMPT_TEMPLATES } from "../utils/prompts";

interface Props {
  onSelect: (text: string) => void;
}

const bgClasses = [
  "bg-blue-200 dark:bg-blue-700",
  "bg-green-200 dark:bg-green-700",
  "bg-yellow-200 dark:bg-yellow-700",
  "bg-purple-200 dark:bg-purple-700",
  "bg-pink-200 dark:bg-pink-700",
  "bg-red-200 dark:bg-red-700",
  "bg-indigo-200 dark:bg-indigo-700",
  "bg-teal-200 dark:bg-teal-700",
];

export default function PromptTemplates({ onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-3 px-3 dark:bg-gray-800">
      {PROMPT_TEMPLATES.map((template, index) => {
        const bg = bgClasses[index % bgClasses.length];
        return (
          <button
            key={template}
            onClick={() => onSelect(template)}
            className={`px-3 py-1 rounded text-sm text-gray-900 dark:text-white hover:opacity-90 transition-colors duration-300 ${bg}`}
          >
            {template}
          </button>
        );
      })}
    </div>
  );
}
