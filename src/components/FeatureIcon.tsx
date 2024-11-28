import Lottie from "lottie-react";
import { motion } from "framer-motion";

const dynamicFeeAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: "Dynamic Fee",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { t: 0, s: [0], h: 1 },
            { t: 90, s: [180], h: 1 },
            { t: 180, s: [360] },
          ],
        },
        p: { a: 0, k: [256, 256] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
            },
            {
              ty: "fl",
              c: { a: 0, k: [1, 0.4, 0.8] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
  ],
};

const botProtectionAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: "Bot Protection",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shield",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [256, 256] },
        a: { a: 0, k: [0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [100, 100], h: 1 },
            { t: 90, s: [110, 110], h: 1 },
            { t: 180, s: [100, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sr",
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 0 },
              pt: { a: 0, k: 5 },
              ir: { a: 0, k: 40 },
              or: { a: 0, k: 80 },
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.6, 0.2, 1] },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
    },
  ],
};

const optimizedReturnsAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 512,
  h: 512,
  nm: "Optimized Returns",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Graph",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [256, 256] },
        a: { a: 0, k: [0, 0] },
        s: { a: 0, k: [100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 1,
                k: [
                  {
                    t: 0,
                    s: [
                      {
                        c: false,
                        v: [
                          [-50, 0],
                          [0, 0],
                          [50, 0],
                        ],
                        i: [
                          [0, 0],
                          [0, 0],
                          [0, 0],
                        ],
                        o: [
                          [0, 0],
                          [0, 0],
                          [0, 0],
                        ],
                      },
                    ],
                  },
                  {
                    t: 90,
                    s: [
                      {
                        c: false,
                        v: [
                          [-50, 25],
                          [0, -25],
                          [50, -50],
                        ],
                        i: [
                          [0, 0],
                          [0, 0],
                          [0, 0],
                        ],
                        o: [
                          [0, 0],
                          [0, 0],
                          [0, 0],
                        ],
                      },
                    ],
                  },
                ],
              },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.8, 0.4] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 4 },
            },
          ],
        },
      ],
    },
  ],
};

const animations = {
  "dynamic-fee": dynamicFeeAnimation,
  "bot-protection": botProtectionAnimation,
  "optimized-returns": optimizedReturnsAnimation,
};

interface FeatureIconProps {
  type: keyof typeof animations;
}
export function FeatureIcon({ type }: FeatureIconProps) {
  console.log("type", animations[type]); // Check if the animation data is being passed correctly
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="w-16 h-16 flex items-center justify-center"
    >
      <Lottie
        animationData={animations[type]}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />
    </motion.div>
  );
}
