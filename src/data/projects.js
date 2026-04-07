export const projects = [
    {
        id: 1,
        title: "The Secret of the Toy Store",
        image: "/assets/images/toy-store-cover.jpg",
        summary: "The toy store on our street was once a sanctuary of dreams—filled with wooden trains, clockwork soldiers, and porcelain dolls. I returned not as a dreamer, but as its night guard. Heavily inspired by 'The Exit 8', this game forces you to patrol the blurred line between childhood nostalgia and waking nightmares.",
        engine: "Unity",
        genre: "Horror / Psychological",
        duration: "Ongoing",
        roles: ["Lead Programmer"],
        updates: [
            {
                version: "v0.4",
                date: "Ongoing",
                title: "Polishing & Narrative Integration",
                desc: "Currently refining the narrative elements to connect the player's childhood story with the gameplay. Focus is on optimization, advanced post-processing, and expanding the variety of anomalies.",
                isLive: true
            },
            {
                version: "v0.3",
                date: "2025-12-01",
                title: "Psychological Tension",
                desc: "Implemented NavMesh-based AI for the 'Security Guard' perspective. Enhanced the atmosphere with 3D spatial audio, focusing on the faint melodies of broken music boxes."
            },
            {
                version: "v0.2",
                date: "2025-11-05",
                title: "The Ticking Shadows",
                desc: "Integrated a C#-based randomization engine to trigger environmental anomalies. Added eerie movements to clockwork soldiers and shifting porcelain doll gazes."
            },
            {
                version: "v0.1",
                date: "2025-10-15",
                title: "Memories & Mechanics",
                desc: "Established the core toy store layout based on nostalgic 90s aesthetics. Implemented the infinite corridor mechanic and the primary loop system."
            }
        ]
    }
];
