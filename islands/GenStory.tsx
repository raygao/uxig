import { ResolutionHosts } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { Button } from "../components/Button.tsx";
import { TextArea } from "../components/TextArea.tsx";


const GenStoryURL = "./api/genStory";
const DefaultScenario = "Write me a 15 words story.";
let scenario = DefaultScenario;

const GenGherkinURL = "./api/genGherkin";

export default function GenStory() {
  return (
    <div class="flex gap-4 py-2">
      <div name="StoryGenerator">
        <form method="POST" disabled="true">
          <TextArea
            type="textarea"
            rows = "4"
            name="scenario"
            value=""
            placeholder="Enter a short description about your story scenario."
            onInput={(e) => setScenario(e.target.value || "")}
          />&nbsp;&nbsp;&nbsp;
          <br/>
          <Button
            type="button"
            id ="GenStoryButton"
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
              const storyContent = fetchStory(GenStoryURL, payload);
            }}
          >
            Generate Story
          </Button>
          &nbsp;&nbsp;&nbsp;
            <Button
            type="button"
            id ="GenGherkinButton"
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
              const storyContent = fetchGherkin(GenGherkinURL, payload);
            }}
          >Gherkin</Button>
        </form>
      </div>
      <div id="returnedStory">Story Placeholder</div>
      <hr></hr>
      <div id="returnedGherkin">Gherkin Placeholder</div>
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
    document.getElementById("GenStoryButton").innerText  = "working...";
    const result = await fetch(url, theScenario);
    const resultInText = await result.text();
    const ResultStories = resultInText.replaceAll(/\\n/g, "<br/>");
    console.log("+++ Successful end reached! With: " + ResultStories);
    document.getElementById("returnedStory").innerHTML = ResultStories;
    if (ResultStories != null) {
      document.getElementById("returnedStory").innerHTML = ResultStories;
    }
    document.getElementById("GenStoryButton").innerText  = "Generate Story";
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

async function fetchGherkin(url: string, theScenario: any) {
  try {
    document.getElementById("GenGherkinButton").innerText  = "working...";
    const result = await fetch(url, theScenario);
    const resultInText = await result.text();
    const ResultGherkin = resultInText.replaceAll(/\\n/g, "<br/>");
    console.log("+++ Successful end reached! With: " + ResultGherkin);
    document.getElementById("returnedGherkin").innerHTML = ResultGherkin;
    if (ResultGherkin != null) {
      document.getElementById("returnedGherkin").innerHTML = ResultGherkin;
    }
    document.getElementById("GenGherkinButton").innerText  = "Gherkin";
    return ResultGherkin;
    //alert("Success! " + result.json);
  } catch (error) {
    console.log(`--- Something went wrong`, error.message);
    console.error(error);
    alert(error);
  } finally {
    console.log(`>>> Fetch reached finally`);
  }
}
