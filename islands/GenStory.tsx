import { ResolutionHosts } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Button } from "../components/Button.tsx";
import { LongerInput } from "../components/LongerInput.tsx";


const URL = "./api/genStory";
let scenario = "Write me a 15 words story.";
 
export default function GenStory() {
  return (
    <div class="flex gap-8 py-6">
      <div name="StoryGenerator">
        <form method="POST" disabled="true">
          <LongerInput
            type="text"
            name="scenario"
            value=""
            placeholder="Enter a short description about your story scenario."
            onInput={(e) => setScenario(e.target.value || "")}
          />&nbsp;&nbsp;&nbsp;
          <Button
            type="button"
            style="border: 4px black; background-color: #e7e7e7"
            onClick={function (event) {
              event.preventDefault();
              const payload = {
                method: "POST",
                headers,
                body: JSON.stringify({ 
                  "command": scenario, 
                  "PreferenceID": document.getElementById("UsingPreferenceID").value,
                }),
              };
              const storyContent = fetchStory(URL, payload);
            }}
          >
            Generate
          </Button>
        </form>
      </div>
      <div id="returnedStory">Result Story</div>
    </div>
  );
}

const headers = {
  "Content-Type": "text/plain",
};

function setScenario(event: string) {
  scenario = event;
}

async function fetchStory(url: string, theScenario: any) {
  try {
    const result = await fetch(url, theScenario);
    const resultInText = await result.text();
    const ResultStories = resultInText.replaceAll(/\\n/g, "<br/>");
    console.log("+++ Successful end reached! With: " + ResultStories);
    document.getElementById("returnedStory").innerHTML = ResultStories;
    if (ResultStories != null) {
      document.getElementById("returnedStory").innerHTML = ResultStories;
    }
    return ResultStories;
    //alert("Success! " + result.json);
  } catch (error) {
    console.log(`--- Something went wrong`, error.message);
    console.error(error);
    alert(error);
  } finally {
    console.log(`>>> Fetch reached finally`);
  }
}
