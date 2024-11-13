import { ChevronDown } from 'lucide-react';

interface TokenInputProps {
  value?: string;
  onChange?: (value: string) => void;
  token: string;
  tokenLogo: string;
  readOnly?: boolean;
}

export function TokenInput({ value, onChange, token, tokenLogo, readOnly }: TokenInputProps) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl space-y-2">
      <div className="flex justify-between">
        <input
          type="number"
          placeholder="0.0"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="bg-transparent text-2xl text-white outline-none w-2/3"
          readOnly={readOnly}
        />
        <button className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-xl hover:bg-white/20">
          <img src={tokenLogo} alt={token} className="w-5 h-5" />
          <span className="text-white">{token}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}