/**
 * WallGamers content.
 * To add a new game/link, push an object to LINKS.
 * To add a new snapshot, push an object to SNAPSHOTS.
 * Nothing else needs to change — the page renders from these arrays.
 */

const LINKS = [
  {
    name: "CubeLands",
    url: "https://cubelands.wallgamers.net",
    tag: "Voxel Sandbox",
    accent: "#19d4c8",
    description:
      "A native-Windows voxel sandbox in the spirit of Minecraft. Infinite procedural terrain, chunked OpenGL rendering, place/break with a real raycast, day/night, hotbar + creative inventory, full menu flow, and disk-persisted worlds.",
    features: [
      "Infinite procedural terrain",
      "Chunked OpenGL rendering",
      "Raycast place / break",
      "Day & night cycle",
      "Hotbar + creative inventory",
      "Disk-persisted worlds",
    ],
  },
];

const SNAPSHOTS = [
  {
    name: "Boblox",
    tag: "Sandbox Platform",
    accent: "#7c5cff",
    status: "In development",
    description:
      "A Windows sandbox with all kinds of games, where you can create your own game in the Boblox Creator. There are pre-generated games, and in Boblox we make the same idea as Roblox: a character that can move forward, jump and more! In the Boblox Creator you can also create/upload 3D models that you can place on your pre-map (grass).",
    features: [
      "Pre-generated games to play",
      "Boblox Creator to build your own",
      "Moving, jumping character",
      "Upload & place 3D models",
      "Editable grass pre-map",
    ],
  },
];
