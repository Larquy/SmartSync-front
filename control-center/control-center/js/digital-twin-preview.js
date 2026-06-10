// ═══════════════════════════════════════════════════════════
// 智环引诊 - 数字孪生预览（首页嵌入，全局 THREE）
// ═══════════════════════════════════════════════════════════
(function () {
    'use strict';

    function TwinPreview() {
        this.container = document.getElementById('twinPreviewCanvas');
        if (!this.container) return;
        this.cadBounds = { minX: 290, maxX: 437, minY: -33, maxY: 60 };
        this.patientMeshes = [];
        this.deptMeshes = [];
        this.topAccents = [];
        this.init();
    }

    TwinPreview.prototype.init = function () {
        var W = this.container.clientWidth || 800;
        var H = this.container.clientHeight || 300;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f2f5);

        var cw = this.cadBounds.maxX - this.cadBounds.minX;
        var cx = (this.cadBounds.minX + this.cadBounds.maxX) / 2;
        var cy = (this.cadBounds.minY + this.cadBounds.maxY) / 2;

        this.camera = new THREE.PerspectiveCamera(38, W / H, 1, 800);
        this.camera.position.set(cx, cy - cw * 0.38, cw * 0.75);
        this.camera.lookAt(cx, cy, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(W, H);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.05;
        this.container.appendChild(this.renderer.domElement);

        this.scene.add(new THREE.AmbientLight(0x8899aa, 0.8));
        this.scene.add(new THREE.HemisphereLight(0xddeeff, 0x8899aa, 0.6));
        var sun = new THREE.DirectionalLight(0xffffff, 1.2);
        sun.position.set(60, -25, 80);
        sun.castShadow = true;
        sun.shadow.mapSize.width = 1024;
        sun.shadow.mapSize.height = 1024;
        sun.shadow.camera.near = 0.5;
        sun.shadow.camera.far = 300;
        sun.shadow.camera.left = -120;
        sun.shadow.camera.right = 120;
        sun.shadow.camera.top = 100;
        sun.shadow.camera.bottom = -100;
        this.scene.add(sun);

        this.load();
        var self = this;
        window.addEventListener('resize', function () { self.onResize(); });
        this.loop();
    };

    TwinPreview.prototype.load = function () {
        var self = this;
        fetch('../../digital-twin/JJI54559656769/cad_twin_data.json')
            .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
            .then(function (data) {
                self.cadBounds = data.metadata.bounds;
                self.build(data);
            })
            .catch(function () {
                self.cadBounds = { min_x: 0, max_x: 140, min_y: 0, max_y: 90 };
                self.build(self.fallbackData());
            });
    };

    TwinPreview.prototype.fallbackData = function () {
        return {
            departments: [
                { name: '门诊大厅', x: 45, y: 25, color: '#3b82f6' },
                { name: '内科', x: 15, y: 60, color: '#0ea5e9' },
                { name: '外科', x: 80, y: 60, color: '#06b6d4' },
                { name: '放射科', x: 15, y: 75, color: '#6366f1' },
                { name: '检验科', x: 80, y: 75, color: '#34d399' },
                { name: '妇科', x: 115, y: 60, color: '#8b5cf6' },
                { name: '药房', x: 115, y: 25, color: '#60a5fa' },
            ],
            patients: Array.from({ length: 20 }, function (_, i) { return {
                x: 10 + Math.random() * 120, y: 12 + Math.random() * 65,
                typeColor: ['#60a5fa', '#34d399', '#f87171'][i % 3]
            }; })
        };
    };

    TwinPreview.prototype.build = function (data) {
        var cw = this.cadBounds.maxX - this.cadBounds.minX;
        var ch = this.cadBounds.maxY - this.cadBounds.minY;
        var cx = (this.cadBounds.minX + this.cadBounds.maxX) / 2;
        var cy = (this.cadBounds.minY + this.cadBounds.maxY) / 2;

        // Floor
        var floor = new THREE.Mesh(
            new THREE.PlaneGeometry(cw, ch),
            new THREE.MeshStandardMaterial({ color: 0xe8eaef, roughness: 0.7, metalness: 0.05 })
        );
        floor.position.set(cx, cy, -0.15);
        floor.receiveShadow = true;
        this.scene.add(floor);

        var grid = new THREE.PolarGridHelper(Math.max(cw, ch) / 2, 40, 20, 64, 0xccd0d8, 0xd8dce4);
        grid.position.set(cx, cy, -0.04);
        this.scene.add(grid);

        // Camera reposition
        this.camera.position.set(cx, cy - cw * 0.38, cw * 0.75);
        this.camera.lookAt(cx, cy, 0);
        this.camera.aspect = this.container.clientWidth / (this.container.clientHeight || 1);
        this.camera.updateProjectionMatrix();

        var self = this;

        // Depts
        (data.departments || []).forEach(function (d) {
            var w = 4.5 + d.name.length * 0.25;
            var dp = 3.6;
            var mesh = new THREE.Mesh(
                new THREE.BoxGeometry(w, dp, 3.8),
                new THREE.MeshStandardMaterial({ color: d.color || '#4b7bec', roughness: 0.35, metalness: 0.10, transparent: true, opacity: 0.55 })
            );
            mesh.position.set(d.x, d.y, 1.9);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            self.scene.add(mesh);
            self.deptMeshes.push(mesh);

            var top = new THREE.Mesh(
                new THREE.BoxGeometry(w + 0.24, dp + 0.24, 0.12),
                new THREE.MeshStandardMaterial({ color: d.color || '#4b7bec', roughness: 0.15, metalness: 0.45, transparent: true, opacity: 0.72 })
            );
            top.position.set(d.x, d.y, 3.85);
            self.scene.add(top);
            self.topAccents.push(top);
        });

        // Patients
        (data.patients || []).slice(0, 20).forEach(function (pt) {
            var c = pt.typeColor || '#60a5fa';
            var ring = new THREE.Mesh(
                new THREE.TorusGeometry(0.38, 0.03, 6, 20),
                new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.35 })
            );
            ring.position.set(pt.x, pt.y, 0.08);
            ring.rotation.x = -Math.PI / 2;
            self.scene.add(ring);

            var core = new THREE.Mesh(
                new THREE.SphereGeometry(0.42, 14, 14),
                new THREE.MeshStandardMaterial({ color: c, roughness: 0.22, metalness: 0.18, emissive: c, emissiveIntensity: 0.45 })
            );
            core.position.set(pt.x, pt.y, 4.0);
            core.userData = { phase: Math.random() * Math.PI * 2, speed: 1.4 + Math.random() * 2, ring: ring };
            self.patientMeshes.push(core);
            self.scene.add(core);
        });

        // Stats
        var el = function (id) { return document.getElementById(id); };
        if (el('previewDeptCount')) el('previewDeptCount').textContent = (data.departments || []).length;
        if (el('previewPatientCount')) el('previewPatientCount').textContent = (data.patients || []).length;
        if (el('previewSubOnline')) el('previewSubOnline').textContent = '28/28';
    };

    TwinPreview.prototype.onResize = function () {
        var W = this.container.clientWidth || 800;
        var H = this.container.clientHeight || 300;
        this.camera.aspect = W / H;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(W, H);
    };

    TwinPreview.prototype.loop = function () {
        var self = this;
        var t0 = 0;
        function frame() {
            requestAnimationFrame(frame);
            t0 += 0.016;
            self.patientMeshes.forEach(function (p) {
                var ph = p.userData.phase, sp = p.userData.speed, ring = p.userData.ring;
                p.scale.setScalar(1 + Math.sin(t0 * sp + ph) * 0.10);
                p.material.emissiveIntensity = 0.38 + Math.sin(t0 * sp * 1.2 + ph) * 0.18;
                if (ring) {
                    ring.scale.setScalar(1 + Math.sin(t0 * sp * 0.9 + ph) * 0.08);
                    ring.material.opacity = 0.25 + Math.sin(t0 * sp * 1.1 + ph) * 0.12;
                }
            });
            self.topAccents.forEach(function (m, i) {
                m.material.opacity = 0.66 + Math.sin(t0 * 1.2 + i * 0.7) * 0.06;
            });
            self.renderer.render(self.scene, self.camera);
        }
        frame();
    };

    new TwinPreview();
})();
