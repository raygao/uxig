import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { LongerInput } from "../components/LongerInput.tsx";


export default function GenStory() {
  return (
    <div class="flex gap-8 py-6">
      <form method="POST">
        <LongerInput
          type="text"
          name="scenario"
          value=""
          placeholder="Enter a short description about your story scenario."
        />&nbsp;&nbsp;&nbsp;
        <button
          type="submit"
          style="border: 4px black; background-color: #e7e7e7"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
