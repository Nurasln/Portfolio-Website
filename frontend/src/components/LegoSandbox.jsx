import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

import { useAnomaly } from '../context/AnomalyContext';

const LegoSandbox = () => {
    const sceneRef = useRef(null);
    const engineRef = useRef(null);
    const [popup, setPopup] = useState(null);
    const { triggerSequence } = useAnomaly();

    const skills = [
        { label: 'C#', color: '#EF4444' },         // Red
        { label: 'Unity', color: '#10B981' },      // Green
        { label: 'Blender', color: '#F59E0B' },    // Yellow
        { label: 'Game Design', color: '#3B82F6' }, // Blue
        { label: 'Level Design', color: '#8B5CF6' },// Purple
        { label: 'Unreal', color: '#EC4899' },     // Pink
        { label: 'C++', color: '#6366F1' },        // Indigo
        { label: 'Git', color: '#F97316' },        // Orange
    ];

    // ANOMALY LOGIC: 1/10 Chance to add the Anomaly Piece
    const finalSkills = [...skills];
    // Use a ref to ensure we decided this only once per mount/session effectively, 
    // or just let it re-roll on mount. 
    // For a strict "1/10 chance", we can do it here.
    // Note: In pure React strict mode, this might calculate twice, but that's fine for an effect.
    if (Math.random() < 0.5) {
        finalSkills.push({ label: 'Anomaly', color: '#000000', textCol: '#FF0000' });
    }

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint,
            Events = Matter.Events;

        // Container dimensions (this component is 40% height of screen)
        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        const engine = Engine.create();
        engineRef.current = engine;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                background: 'transparent',
                wireframes: false,
                pixelRatio: window.devicePixelRatio
            }
        });

        // -- BOUNDARIES --
        const wallThickness = 120; // Thick invisible walls
        const wallOptions = { isStatic: true, render: { visible: false } };

        // 1. Ground (Bottom)
        const ground = Bodies.rectangle(width / 2, height + (wallThickness / 2), width, wallThickness, wallOptions);

        // 2. Left Wall
        const leftWall = Bodies.rectangle(0 - (wallThickness / 2), height / 2, wallThickness, height * 2, wallOptions);

        // 3. Right Wall
        const rightWall = Bodies.rectangle(width + (wallThickness / 2), height / 2, wallThickness, height * 2, wallOptions);

        // 4. Ceiling (Top of this container, preventing blocks going up)
        // Strictly at y=0 relative to container to prevent escape upward
        const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions);

        Composite.add(engine.world, [ground, leftWall, rightWall, ceiling]);

        // -- SPAWN BLOCKS --
        // Use finalSkills instead of skills
        const boxes = finalSkills.map((skill, index) => {
            const blockWidth = 100;
            const blockHeight = 50;
            const cols = 4;
            const col = index % cols;
            const row = Math.floor(index / cols);

            // Distribute evenly across the ENTIRE width
            // Spacing is total width divided by number of columns
            const sectionWidth = width / cols;
            // Center in each section
            const spawnX = (col * sectionWidth) + (sectionWidth / 2);

            // Randomize slightly for natural look
            const randomOffset = (Math.random() * 40) - 20;

            const spawnY = 50 + (row * 80);

            return Bodies.rectangle(spawnX + randomOffset, spawnY, blockWidth, blockHeight, {
                chamfer: { radius: 5 },
                friction: 0.8,
                frictionAir: 0.01,
                restitution: 0.2,
                density: 0.005,
                render: {
                    fillStyle: skill.color,
                    strokeStyle: skill.label === 'Anomaly' ? '#FF0000' : '#ffffff', // Red stroke for Anomaly
                    lineWidth: 2,
                    text: {
                        content: skill.label,
                        color: skill.textCol || '#ffffff',
                        size: 14,
                        family: 'Inter, sans-serif'
                    }
                },
                label: skill.label
            });
        });

        Composite.add(engine.world, boxes);

        // -- MOUSE CONTROL --
        const mouse = Mouse.create(render.canvas);
        mouse.pixelRatio = window.devicePixelRatio;

        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Click Event (Popups)
        Events.on(mouseConstraint, 'mousedown', function (event) {
            const mousePosition = event.mouse.position;
            const bodies = Composite.allBodies(engine.world);
            const clickedBodies = Matter.Query.point(bodies, mousePosition);

            if (clickedBodies.length > 0) {
                const clickedBody = clickedBodies[0];
                if (clickedBody.isStatic) return; // Don't click walls

                // CHECK FOR ANOMALY
                if (clickedBody.label === 'Anomaly') {
                    // Trigger Global Cinematic Sequence
                    triggerSequence('/game/1'); // ID 1 is The Secret of the Toy Store
                    return;
                }

                const skill = finalSkills.find(s => s.label === clickedBody.label);
                if (skill) {
                    setPopup(skill);
                }
            }
        });

        // Run
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Rendering Hook
        Events.on(render, 'afterRender', function () {
            const context = render.context;
            context.font = 'bold 14px Inter, sans-serif';
            context.textAlign = 'center';
            context.textBaseline = 'middle';

            boxes.forEach((box, i) => {
                const { x, y } = box.position;
                const angle = box.angle;
                const label = finalSkills[i].label; // Use finalSkills

                context.save();
                context.translate(x, y);
                context.rotate(angle);

                // Studs
                context.fillStyle = 'rgba(0,0,0,0.1)';
                context.beginPath();
                context.arc(-25, -12, 6, 0, 2 * Math.PI);
                context.arc(25, -12, 6, 0, 2 * Math.PI);
                context.arc(-25, 12, 6, 0, 2 * Math.PI);
                context.arc(25, 12, 6, 0, 2 * Math.PI);
                context.fill();

                // Text
                context.fillStyle = label === 'Anomaly' ? '#FF0000' : '#FFFFFF';
                if (label !== 'Anomaly') {
                    context.shadowColor = 'rgba(0,0,0,0.5)';
                    context.shadowBlur = 4;
                }
                context.fillText(label, 0, 0);
                context.restore();
            });
        });

        const handleResize = () => {
            if (!sceneRef.current) return;

            const newWidth = sceneRef.current.clientWidth;
            const newHeight = sceneRef.current.clientHeight;

            // Resize Canvas
            render.canvas.width = newWidth;
            render.canvas.height = newHeight;

            // Update Ground
            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + (wallThickness / 2) });
            // Update Ceiling
            Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
            // Update Left Wall (Height only)
            Matter.Body.setPosition(leftWall, { x: 0 - (wallThickness / 2), y: newHeight / 2 });
            // Update Right Wall
            Matter.Body.setPosition(rightWall, { x: newWidth + (wallThickness / 2), y: newHeight / 2 });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            Composite.clear(engine.world);
            Matter.Engine.clear(engine);
            Render.stop(render);
            Runner.stop(runner);
            if (render.canvas) render.canvas.remove();
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Note: finalSkills dependency omitted intentionally for one-time setup or needs useMemo

    return (
        <div className="relative w-full h-full">
            <div ref={sceneRef} className="w-full h-full cursor-move" />

            {popup && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-700 p-4 rounded-xl shadow-2xl z-50 w-64 text-center pointer-events-auto">
                    <h3 className="text-lg font-bold mb-1" style={{ color: popup.color }}>{popup.label}</h3>
                    <p className="text-gray-400 text-xs">
                        {popup.label} Developer & Designer.
                    </p>
                    <button onClick={() => setPopup(null)} className="mt-2 text-xs text-gray-500 hover:text-white underline cursor-pointer">Close</button>
                </div>
            )}
        </div>
    );
};

export default LegoSandbox;
