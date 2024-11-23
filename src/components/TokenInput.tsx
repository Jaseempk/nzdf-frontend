// import { ChevronDown } from "lucide-react";

interface TokenInputProps {
  value?: string;
  onChange?: (value: string) => void;
  token: string;
  tokenLogo: string;
  readOnly?: boolean;
  isError?: boolean;
}

export function TokenInput({
  value,
  onChange,
  token,
  tokenLogo,
  readOnly,
  isError,
}: TokenInputProps) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl space-y-2 transition-colors duration-200 hover:bg-white/[0.07]">
      <div className="flex justify-between">
        <input
          type="number"
          placeholder="0.0"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`bg-transparent text-2xl outline-none w-2/3 placeholder-gray-500 ${
            isError ? "text-red-500" : "text-white"
          }`}
          readOnly={readOnly}
        />
        <button className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-xl hover:bg-white/20 transition-colors duration-200">
          <img src={tokenLogo} alt={token} className="w-5 h-5" />
          <span className="text-white">{token}</span>
        </button>
      </div>
    </div>
  );
}
