import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";


export function TextArea(props: JSX.HTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea 
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-10 py-10 border-black-500 border-2 rounded bg-white hover:bg-gray-200 transition-colors"
    />
  );
}
