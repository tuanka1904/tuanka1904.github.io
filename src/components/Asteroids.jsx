"use client";
import { useEffect, useRef, useState } from "react";

const W = 240;
const H = 420;
const TAU = Math.PI * 2;

export default function Asteroids() {
    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    const keysRef = useRef({});
    const modeRef = useRef("attract");
    const [score, setScore] = useState(0);
    const [mode, setMode] = useState("attract");

    // ─── game loop ───────────────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;

        const wrap = (o) => {
            if (o.x < 0) o.x += W;
            if (o.x > W) o.x -= W;
            if (o.y < 0) o.y += H;
            if (o.y > H) o.y -= H;
        };
        const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
        const glow = (c, b) => { ctx.shadowColor = c; ctx.shadowBlur = b; };
        const noGlow = () => { ctx.shadowBlur = 0; };

        function makeShip() {
            return {
                x: W / 2, y: H / 2,
                vx: 0, vy: 0,
                angle: -Math.PI / 2,
                thrusting: false,
                shootCd: 0,
                invincible: 90,
                dead: false,
                deathTimer: 0,
            };
        }

        function makeAsteroid(size, ox, oy) {
            const radius = size === "L" ? 36 : size === "M" ? 20 : 10;
            const sides  = size === "L" ? 8 + (Math.random() * 4 | 0) : size === "M" ? 6 + (Math.random() * 2 | 0) : 5;
            const spd    = (1 + Math.random() * 1.2) * (size === "L" ? 0.65 : size === "M" ? 1.1 : 1.9);
            const ang    = Math.random() * TAU;
            let x = ox, y = oy;
            if (x === undefined) {
                do { x = Math.random() * W; y = Math.random() * H; }
                while (Math.hypot(x - W / 2, y - H / 2) < 75);
            }
            return {
                x, y,
                vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
                size, radius,
                angle: 0,
                rotSpd: (Math.random() - 0.5) * 0.025,
                sides,
                offsets: Array.from({ length: sides }, () => 0.7 + Math.random() * 0.38),
            };
        }

        const g = {
            ship: makeShip(),
            bullets: [],
            asteroids: [],
            particles: [],
            score: 0,
            wave: 0,
            aiShootTimer: 0,
        };
        gameRef.current = g;

        function spawnWave() {
            g.wave++;
            for (let i = 0; i < 3 + g.wave; i++) g.asteroids.push(makeAsteroid("L"));
        }

        function burst(x, y, color, n = 12) {
            for (let i = 0; i < n; i++) {
                const a = Math.random() * TAU;
                const spd = 1 + Math.random() * 3.5;
                g.particles.push({
                    x, y,
                    vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
                    life: 1,
                    decay: 0.016 + Math.random() * 0.024,
                    r: 1.5 + Math.random() * 2.5,
                    color,
                });
            }
        }

        function shoot() {
            const s = g.ship;
            g.bullets.push({
                x: s.x + Math.cos(s.angle) * 16,
                y: s.y + Math.sin(s.angle) * 16,
                vx: Math.cos(s.angle) * 9.5 + s.vx * 0.25,
                vy: Math.sin(s.angle) * 9.5 + s.vy * 0.25,
                life: 50,
                trail: [],
            });
        }

        // ─── AI auto-pilot ───────────────────────────────────────────────────
        function aiUpdate() {
            const s = g.ship;
            if (!g.asteroids.length) return;

            let nearest = null, nd = Infinity;
            for (const a of g.asteroids) {
                const d = dist(s, a);
                if (d < nd) { nd = d; nearest = a; }
            }

            const lead = nd / 9.5;
            const tx = nearest.x + nearest.vx * lead;
            const ty = nearest.y + nearest.vy * lead;
            const targetAngle = Math.atan2(ty - s.y, tx - s.x);
            let da = targetAngle - s.angle;
            while (da > Math.PI) da -= TAU;
            while (da < -Math.PI) da += TAU;

            s.angle += Math.sign(da) * Math.min(Math.abs(da), 0.05);

            if (nd < 70) {
                const flee = s.angle + Math.PI;
                s.vx += Math.cos(flee) * 0.2; s.vy += Math.sin(flee) * 0.2;
                s.thrusting = true;
            } else {
                s.thrusting = nd > 130;
                if (s.thrusting) { s.vx += Math.cos(s.angle) * 0.07; s.vy += Math.sin(s.angle) * 0.07; }
            }

            if (Math.abs(da) < 0.2 && g.aiShootTimer <= 0) {
                shoot();
                g.aiShootTimer = 20 + (Math.random() * 20 | 0);
            }
            if (g.aiShootTimer > 0) g.aiShootTimer--;
        }

        // ─── update ──────────────────────────────────────────────────────────
        function updateParticles() {
            for (let i = g.particles.length - 1; i >= 0; i--) {
                const p = g.particles[i];
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.94; p.vy *= 0.94;
                p.life -= p.decay;
                if (p.life <= 0) g.particles.splice(i, 1);
            }
        }

        function update() {
            const s = g.ship;

            if (s.dead) {
                if (--s.deathTimer <= 0) Object.assign(s, makeShip());
                updateParticles();
                return;
            }

            if (s.invincible > 0) s.invincible--;

            if (modeRef.current === "attract") {
                aiUpdate();
            } else {
                const k = keysRef.current;
                if (k["ArrowLeft"] || k["a"] || k["A"]) s.angle -= 0.055;
                if (k["ArrowRight"] || k["d"] || k["D"]) s.angle += 0.055;
                s.thrusting = !!(k["ArrowUp"] || k["w"] || k["W"]);
                if (s.thrusting) { s.vx += Math.cos(s.angle) * 0.13; s.vy += Math.sin(s.angle) * 0.13; }
                if (k[" "] && s.shootCd <= 0) { shoot(); s.shootCd = 16; }
            }

            if (s.shootCd > 0) s.shootCd--;
            s.vx *= 0.984; s.vy *= 0.984;
            const spd = Math.hypot(s.vx, s.vy);
            if (spd > 5.5) { s.vx = s.vx / spd * 5.5; s.vy = s.vy / spd * 5.5; }
            s.x += s.vx; s.y += s.vy;
            wrap(s);

            // Bullets
            for (let i = g.bullets.length - 1; i >= 0; i--) {
                const b = g.bullets[i];
                b.trail.push({ x: b.x, y: b.y });
                if (b.trail.length > 5) b.trail.shift();
                b.x += b.vx; b.y += b.vy;
                wrap(b);
                if (--b.life <= 0) { g.bullets.splice(i, 1); continue; }

                let hit = false;
                for (let j = g.asteroids.length - 1; j >= 0; j--) {
                    const a = g.asteroids[j];
                    if (dist(b, a) < a.radius) {
                        const clr = "#FFFFFF";
                        burst(a.x, a.y, clr, a.size === "L" ? 18 : 11);
                        if (a.size === "L") {
                            g.asteroids.push(makeAsteroid("M", a.x, a.y));
                            g.asteroids.push(makeAsteroid("M", a.x, a.y));
                            g.score += 20;
                        } else if (a.size === "M") {
                            g.asteroids.push(makeAsteroid("S", a.x, a.y));
                            g.asteroids.push(makeAsteroid("S", a.x, a.y));
                            g.score += 50;
                        } else {
                            g.score += 100;
                        }
                        setScore(g.score);
                        g.asteroids.splice(j, 1);
                        g.bullets.splice(i, 1);
                        hit = true;
                        break;
                    }
                }
                if (hit) continue;
            }

            // Asteroids
            for (const a of g.asteroids) {
                a.x += a.vx; a.y += a.vy; a.angle += a.rotSpd;
                wrap(a);
            }

            // Ship-asteroid collision
            if (s.invincible <= 0) {
                for (const a of g.asteroids) {
                    if (dist(s, a) < a.radius * 0.78) {
                        burst(s.x, s.y, "#FFFFFF", 22);
                        s.dead = true;
                        s.deathTimer = 100;
                        g.score = Math.max(0, g.score - 150);
                        setScore(g.score);
                        break;
                    }
                }
            }

            if (g.asteroids.length === 0) spawnWave();
            updateParticles();
        }

        // ─── draw ────────────────────────────────────────────────────────────
        function draw() {
            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = "rgba(255,255,255,0.05)";
            ctx.lineWidth = 0.5;
            for (let x = 0; x <= W; x += 40) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y <= H; y += 40) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }

            // Particles
            for (const p of g.particles) {
                ctx.globalAlpha = Math.max(0, p.life);
                glow(p.color, 10);
                ctx.fillStyle = p.color;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU); ctx.fill();
            }
            ctx.globalAlpha = 1;
            noGlow();

            // Asteroids
            for (const a of g.asteroids) {
                ctx.save();
                ctx.translate(a.x, a.y);
                ctx.rotate(a.angle);
                ctx.beginPath();
                for (let i = 0; i < a.sides; i++) {
                    const ang = (i / a.sides) * TAU;
                    const r = a.radius * a.offsets[i];
                    i === 0
                        ? ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r)
                        : ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
                }
                ctx.closePath();
                const clr = "#FFFFFF";
                glow(clr, 14);
                ctx.strokeStyle = clr;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            }
            noGlow();

            // Bullets
            for (const b of g.bullets) {
                if (b.trail.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(b.trail[0].x, b.trail[0].y);
                    for (const pt of b.trail) ctx.lineTo(pt.x, pt.y);
                    ctx.strokeStyle = "rgba(255,255,255,0.35)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
                glow("#FFFFFF", 14);
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath(); ctx.arc(b.x, b.y, 2.5, 0, TAU); ctx.fill();
            }
            noGlow();

            // Ship
            const s = g.ship;
            if (!s.dead && !(s.invincible > 0 && Math.floor(s.invincible / 6) % 2 === 0)) {
                ctx.save();
                ctx.translate(s.x, s.y);
                ctx.rotate(s.angle);

                if (s.thrusting) {
                    const fl = 6 + Math.random() * 9;
                    ctx.beginPath();
                    ctx.moveTo(-9, -5); ctx.lineTo(-9 - fl, 0); ctx.lineTo(-9, 5);
                    glow("#FFFFFF", 20);
                    ctx.strokeStyle = "#CCCCCC";
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }

                ctx.beginPath();
                ctx.moveTo(14, 0);
                ctx.lineTo(-9, -7);
                ctx.lineTo(-5, 0);
                ctx.lineTo(-9, 7);
                ctx.closePath();
                glow("#FFFFFF", 24);
                ctx.strokeStyle = "#FFFFFF";
                ctx.lineWidth = 1.5;
                ctx.stroke();
                noGlow();
                ctx.restore();
            }
        }

        spawnWave();
        function loop() { update(); draw(); animId = requestAnimationFrame(loop); }
        loop();
        return () => cancelAnimationFrame(animId);
    }, []);

    // ─── keyboard input ──────────────────────────────────────────────────────
    useEffect(() => {
        const PLAY_KEYS = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "a", "A", "d", "D", "w", "W", " "]);
        let idleTimer;

        function onDown(e) {
            keysRef.current[e.key] = true;
            if (PLAY_KEYS.has(e.key)) {
                e.preventDefault();
                if (modeRef.current === "attract") {
                    modeRef.current = "playing";
                    setMode("playing");
                    if (gameRef.current) {
                        gameRef.current.score = 0;
                        setScore(0);
                        gameRef.current.bullets = [];
                    }
                }
                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => {
                    modeRef.current = "attract";
                    setMode("attract");
                    if (gameRef.current) { gameRef.current.score = 0; setScore(0); }
                }, 9000);
            }
        }
        function onUp(e) { keysRef.current[e.key] = false; }

        window.addEventListener("keydown", onDown);
        window.addEventListener("keyup", onUp);
        return () => {
            window.removeEventListener("keydown", onDown);
            window.removeEventListener("keyup", onUp);
            clearTimeout(idleTimer);
        };
    }, []);

    return (
        <div className="relative border border-white/10 bg-black p-2 rounded-2xl flex flex-col items-center w-fit mx-auto select-none mt-12 md:mt-0 shadow-2xl">
            <div className="absolute top-3 left-4 font-sans text-[10px] text-zinc-500 uppercase z-10 font-bold px-1">
                {mode === "attract" ? "AI: AUTO_PILOT" : "MODE: PLAYER"}
            </div>
            <div className="absolute top-3 right-4 font-sans text-[10px] text-zinc-500 uppercase font-bold z-10 px-1">
                SCORE: {score}
            </div>

            <canvas
                ref={canvasRef}
                width={W}
                height={H}
                className="mt-6 border border-white/5 rounded-xl bg-white/5"
            />

            {mode === "attract" && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-[9px] text-zinc-600 uppercase tracking-widest whitespace-nowrap animate-pulse">
                    PRESS WASD + SPACE TO PLAY
                </div>
            )}
        </div>
    );
}
