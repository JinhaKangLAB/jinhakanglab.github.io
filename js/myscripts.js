
const title = document.querySelector(".Mname");
if (title) {
	title.addEventListener("mouseenter", () => {
		gsap.to(".distort feDisplacementMap", 1, {
			attr: {
				scale: 100
			},
			ease: "circ.out"
		});
		gsap.to(".distort feTurbulence", 1, {
			attr: {
				baseFrequency: '2.08 .08'
			},
			ease: "circ.out"
		}, 1);
		gsap.to(title, 1, {
			fontVariationSettings: "'wght' 450",
			ease: "back.out"
		});
	});
	title.addEventListener("mouseleave", () => {
		gsap.to(".distort feDisplacementMap", 1, {
			attr: {
				scale: 0
			},
			ease: "circ.out"
		}, 1);
		gsap.to(".distort feTurbulence", 1, {
			attr: {
				baseFrequency: '2.01 .01'
			},
			ease: "circ.out"
		}, 1);
		gsap.to(title, 1, {
			fontVariationSettings: "'wght' 450",
			ease: "back.out"
		}, 1);
	});
}
