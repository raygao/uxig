import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { TextArea } from "../components/TextArea.tsx";

const URL = "./api/setPreferences";
let PreferenceID = "";

export default function Preferences() {
  return (
    <div class="flex gap-8 py-6">
      <div id="UsingPreferenceID"></div>
      <div>Preferences for generating stories</div>
      <div>
        <form method="POST" disabled="true">
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
                  id="StoryCopies"
                  min="1"
                  max="5"
                  onChange={(e) =>
                    settingValue(e.target.id, e.target.value || "")}
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
                  id="StoryLength"
                  min="50"
                  max="100"
                  onChange={(e) =>
                    settingValue(e.target.id, e.target.value || "")}
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
                  id="StorySteps"
                  min="5"
                  max="10"
                  onChange={(e) =>
                    settingValue(e.target.id, e.target.value || "")}
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
                <select
                  id="Sentiment"
                  onChange={(e) =>
                    settingValue(e.target.id, e.target.value || "")}
                >
                  <option value="">
                    -- Please select --
                  </option>
                  <option value="Positive">Positive</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Negative">Negative</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="Regeneration">
                  Regeneration Volatility: 0 - Constant, 2 - Max
                </label>
              </td>
              <td>
                <select
                  id="Regeneration"
                  onChange={(e) =>
                    settingValue(e.target.id, e.target.value || "")}
                >
                  <option value="">
                    -- Please select --
                  </option>
                  <option value="0">0</option>
                  <option value="0.2">0.2</option>
                  <option value="0.4">0.4</option>
                  <option value="0.7">0.7</option>
                  <option value="1">1.0</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                </select>
              </td>
            </tr>
          </table>
          <br />
          &nbsp;&nbsp;&nbsp;
          <button
            id="PrefButton"
            type="button"
            style="border: 4px black; background-color: #e7e7e7"
            onClick={function (event) {
              event.preventDefault();
              const payload = setPreferences();
              const savedPerfID = sendPreferences(URL, payload);
            }}
          >
            Save Preferences
          </button>
        </form>
      </div>
    </div>
  );
}

const headers = {
  "Content-Type": "text/plain",
};

function settingValue(target: string, val: string) {
  //alert('target: ' + target + ', event: ' + val);
  document.getElementById(target).value = val;
}

function setPreferences() {
  const StoryCopies = document.getElementById("StoryCopies").value;
  const StoryLength = document.getElementById("StoryLength").value;
  const StorySteps = document.getElementById("StorySteps").value;
  const Sentiment = document.getElementById("Sentiment").value;
  const Regeneration = document.getElementById("Regeneration").value;
  const prefs = {
    "PreferenceID": PreferenceID,
    "StoryCopies": StoryCopies,
    "StoryLength": StoryLength,
    "StorySteps": StorySteps,
    "Sentiment": Sentiment,
    "Regeneration": Regeneration,
  };
  const payload = {
    method: "POST",
    headers,
    body: JSON.stringify({ Preferences: prefs }),
  };
  return payload;
}

async function sendPreferences(url: string, content: any) {
  try {
    document.getElementById("PrefButton").innerText  = 'working';
    const result = await fetch(url, content);
    const resultID = await result.text();
    console.log("+++ Successful end reached! With ID: " + resultID);
    if (resultID != null) {
      PreferenceID = resultID;
      //alert("Success! " + result.json);
      document.getElementById("UsingPreferenceID").value =  PreferenceID;
      document.getElementById("PrefButton").innerText  = 'Save Preferences';
      return PreferenceID;
    }
    //alert("Success! " + result.json);
  } catch (error) {
    console.log(`--- Something went wrong`, error.message);
    console.error(error);
    alert(error);
  } finally {
    console.log(`>>> Fetch reached finally`);
  }
}
