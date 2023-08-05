import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { LongerInput } from "../components/LongerInput.tsx";
import axios from "https://deno.land/x/redaxios@0.5.1/mod.ts";
import { ConstructorDeclarationBase, ResolutionHosts } from "https://deno.land/x/ts_morph@17.0.1/ts_morph.js";
import { resolve } from "$std/path/win32.ts";
import {Deferred, deferred} from "https://deno.land/std/async/mod.ts";

const URL = "./api/genStory";
let scenario = "This is the default story template.";

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
            onInput={e => setScenario(e.target.value || '')}
          />&nbsp;&nbsp;&nbsp;
          <Button
            type="submit"
            style="border: 4px black; background-color: #e7e7e7"
            onClick={function (e) {
              const payload = {
                method: "POST",
                headers,
                body: JSON.stringify({body: scenario}),
              };
              fetchStory("http://localhost:8000/api/genStory", payload);
            }}
          >
            Generate
          </Button>
        </form>
      </div>
      <div name="returned story">Result Story</div>
    </div>
  );
}

const headers = {
  "Content-Type": "text/plain",
};

function setScenario (event: string) {
  //scenario = event;
  scenario = event;
}

async function fetchStory(url: string, theScenario: any) {
  //alert("target url is: " + url);
  // console.log("The Payload is: " + theScenario.body)
  // console.log("Now fetching URL: " + url);
  // TOD the error has appeared due to some funny reason.
  // const result = await fetch(url, theScenario).then(function (response) {
  //   if (response.ok) {
  //     alert("Done with response: " + response.text());
  //   }
  //   return Promise.reject(response.body);
  // }).then(function (data) {
  //   console.log('log said: ' + data);
  //   alert(data);
  // }).catch(function (error) {
  //   console.warn(error);
  //   alert('....error has appeared ---> ' + error.code + " "+ error.message);
  // });

  try {
    const result = await fetch(url, theScenario);
    const json = console.log("Success: " + await result.json);
    console.log('+++ Successful end reached: ', json);
    alert("Success! " + result.json);
  } catch (error) {
    console.log(`!! Something went wrong`, error.message);
    console.error(error);
    //alert(error);
  } finally {
    console.log(`Fetch reached finally`);
  }
  // .then((response) => {
  //   console.log(response); alert(response);});

}
