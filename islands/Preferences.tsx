import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { LongerInput } from "../components/LongerInput.tsx";

export default function Preferences() {
  return (
    <div class="flex gap-8 py-6">
      <div>Preferences for generating stories</div>
      <div>
        <form method="POST">
          <table>
            <tr>
              <td>
                <label for="StoryCopies">
                  Default Copies of stories - min - 1, max - 5:
                </label>
              </td>
              <td>
                <input
                  type="number"
                  name="StoryCopies"
                  min="1"
                  max="5"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="StoryLength">
                  Ideal Story Length - min - 50, max - 100:
                </label>
              </td>
              <td>
                <input
                  type="number"
                  name="StoryLength"
                  min="50"
                  max="100"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="StorySteps">
                  Number of Story Steps - min - 5, max - 10:
                </label>
              </td>
              <td>
                <input
                  type="number"
                  name="StorySteps"
                  min="5"
                  max="10"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="Sentiment">
                  Story Sentiment, Positive, Neutral, Negative:
                </label>
              </td>
              <td>
                <select name="Sentiment">
                  <option value="">
                    -- Please select --
                  </option>
                  <option>Positive</option>
                  <option>Neutral</option>
                  <option>Negative</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="Regeneraton">
                  Regeneration Volatility: 0 - Constant, 2 - Max
                </label>
              </td>
              <td>
                <select name="Regeneration">
                  <option value="">
                    -- Please select --
                  </option>
                  <option>0</option>
                  <option>0.2</option>
                  <option>0.4</option>
                  <option>0.7</option>
                  <option>1.0</option>
                  <option>1.5</option>
                  <option>2</option>
                </select>
              </td>
            </tr>
          </table>
          <br/>
          &nbsp;&nbsp;&nbsp;
          <button
            type="submit"
            style="border: 4px black; background-color: #e7e7e7"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
