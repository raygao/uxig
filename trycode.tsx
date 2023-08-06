

const p = "Story 1:\nStep 1: Grace, a high school student, decides to learn French.\nStep 2: She enrolls in a language class and starts practicing vocabulary and grammar.\nStep 3: Grace practices speaking with native speakers, improving her pronunciation.\nStep 4: She immerses herself in French music and movies, enhancing her listening skills.\nStep 5: Months later, Grace confidently converses with a French exchange student, realizing her dedication paid off.\n\nStory 2:\nStep 1: Alex, an aspiring traveler, wants to learn Spanish.\nStep 2: He downloads a language learning app and studies diligently daily.\nStep 3: Alex listens to Spanish podcasts, improving his comprehension skills.\nStep 4: He visits a Spanish-speaking country, immersing himself in the language.\nStep 5: Alex successfully becomes fluent, making new friends and exploring new cultures effortlessly.\n\nStory 3:\nStep 1: Emma, a businesswoman, aims to learn Mandarin.\nStep 2: She hires a private tutor and practices conversational skills.\nStep 3: Emma attends language exchange meetups, gaining confidence in speaking.\nStep 4: She travels to China for work, impressing her clients with her language abilities.\nStep 5: Emma's proficiency in Mandarin opens up new career opportunities and deepens her cultural understanding.";

console.log(p.replaceAll(/\n/g, " <br/><br/>"));

var text = 'test1 \ntest2';

console.log(text.replaceAll(/\n/g, " <br/><br/>"))     //['test1', 'test2']
