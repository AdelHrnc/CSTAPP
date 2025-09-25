// points.js
export const cognitivePoints = {
  structure: {
    scaffolding: {
      title: "Features for Structure Scaffolding",
      points: [
        {
          text: "S1. Provide a module that offers children the required structure (e.g., 'the beginning and the end' or 'the conflict in the middle') and elements (e.g., characters like antagonists and protagonists) of the story based on different genres.",
          age: "7-13",
          ai: false
        }
      ]
    },
    workflow: {
      title: "Features for Workflow Scaffolding",
      points: [
        {
          text: "S1. Provide an integrated interface that connects physical components (e.g., sensors, motors, circuits) with digital tools (e.g., various panels and state transition diagrams) in block-based programming environments, enabling children to explore, debug, and efficiently manage complex workflows.",
          age: "9-13",
          ai: true
        }
      ]
    },
    tutorial: {
      title: "Features for Tutorial",
      points: [
        {
          text: "S1. Mitigate cognitive load placed on the participants by designing robot interactions to set common ground before the game begins.",
          age: "5-10",
          ai: false
        }
      ]
    }
  },
  idea: {
    ideation: {
      title: "Features for Ideation Scaffolding",
      points: [
        {
          text: "S1. Provide a feature in the interface that generates abstract sketches with semantic similarity to existing story content and sketches upon request by children.",
          age: "9-13",
          ai: true
        },
        {
          text: "S2. Provide examples or alternative ideas during the ideation process when using a prototyping tool.",
          age: "8-12",
          ai: false
        },
        {
          text: "S3. Provide a feature in the prototyping tool that enables children to illustrate the structure of the idea in the idea development stage.",
          age: "7-13",
          ai: false
        },
        {
          text: "S4. Consider incorporating distinct movements at various speeds and colored lights into the robot to stimulate creativity.",
          age: "6-11",
          ai: false
        }
      ]
    },
    questioning: {
      title: "Features for Question Scaffolding",
      points: [
        {
          text: "S1. Integrate a more adaptive algorithm to adjust the complexity of the AI agent's questions by assessing children's cognitive level based on their responses [9].",
          age: "7-13",
          ai: true
        },
        {
          text: "S2. Use the question-feedback-scaffolding framework in collaborative storytelling activity [21].",
          age: "2-11",
          ai: false
        },
        {
          text: "S3. Encourage originality by rewarding unique or unusual contributions.",
          age: "6-13",
          ai: false
        }
      ]
    }
  }
}
