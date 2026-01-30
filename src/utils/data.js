const position = [
  { x: 800, y: 0, z: 560, rotateAng: Math.PI / -2 },
  { x: 800, y: 0, z: 1120, rotateAng: Math.PI / -2 },
  { x: 800, y: 0, z: 1680, rotateAng: Math.PI / -2 },
  { x: 800, y: 0, z: 2240, rotateAng: Math.PI / -2 },
  { x: 1750, y: 0, z: 560, rotateAng: Math.PI / 1 },

  { x: -1200, y: 0, z: 880, rotateAng: Math.PI / -2 },
  { x: -1200, y: 0, z: 1580, rotateAng: Math.PI / -2 },
  { x: -1200, y: 0, z: 2280, rotateAng: Math.PI / -2 },
  { x: -550, y: 0, z: 560, rotateAng: Math.PI / 1 },

  { x: -1200, y: 0, z: -560, rotateAng: Math.PI / -2 },
  { x: -1200, y: 0, z: -1230, rotateAng: Math.PI / -2 },
  { x: -360, y: 0, z: -560, rotateAng: Math.PI / 2 },
  { x: -360, y: 0, z: -1230, rotateAng: Math.PI / 2 },

  // { x: -3.4, y: 0, z: 2.5, scaleX: 0.004, scaleY: 0.004, scaleZ: 0.003, rotateAng: Math.PI / 1,cx: -2.4, cy: 1, cz: -2.6, cScaleX: 0.01, cScaleY:0.01, cScaleZ:0.01 },

  { x: -1140, y: 0, z: -2360, rotateAng: Math.PI / -2 },
  { x: -360, y: 0, z: -2360, rotateAng: Math.PI / -2 },

  { x: 1180, y: 0, z: -560, rotateAng: Math.PI / -2 },
  { x: 1180, y: 0, z: -1260, rotateAng: Math.PI / -2 },
  { x: 1180, y: 0, z: -1960, rotateAng: Math.PI / -2 },
  { x: 1180, y: 0, z: -2660, rotateAng: Math.PI / -2 },
  { x: 2000, y: 0, z: -560, rotateAng: Math.PI / 2 },
  { x: 2000, y: 0, z: -1260, rotateAng: Math.PI / 2 },
  { x: 2000, y: 0, z: -1960, rotateAng: Math.PI / 2 },
  { x: 2000, y: 0, z: -2660, rotateAng: Math.PI / 2 },

  { x: 2400, y: 0, z: 560, rotateAng: Math.PI / 2 },
  { x: 2400, y: 0, z: 1120, rotateAng: Math.PI / 2 },
  { x: 2400, y: 0, z: 1680, rotateAng: Math.PI / 2 },
  { x: 2400, y: 0, z: 2240, rotateAng: Math.PI / 2 }
]

const demo1 = [ // 演示数据
  { equID: '443-5-2', type: 'equ', id: '443-5-2', name: '测试数据2', x: -397, y: 0, z: -2686, lx: -397, ly: 350, lz: -2686, rotateAng: Math.PI / 1, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '443-4-2', type: 'equ', id: '443-4-2', name: '测试数据2', x: -397, y: 0, z: -1890, lx: -397, ly: 350, lz: -1890, rotateAng: Math.PI / 1, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '045-9', type: 'equ', id: '045-9', name: '测试数据2', x: 583, y: 0, z: -2790, lx: 583, ly: 350, lz: -2790, rotateAng: 0, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '045-10', type: 'equ', id: '045-10', name: '测试数据2', x: 583, y: 0, z: -2214, lx: 583, ly: 350, lz: -2214, rotateAng: 0, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '036-08', type: 'equ', id: '036-08', name: '测试数据2', x: 583, y: 0, z: -1638, lx: 583, ly: 350, lz: -1638, rotateAng: 0, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '053-12', type: 'equ', id: '053-12', name: '测试数据2', x: 583, y: 0, z: -1060, lx: 583, ly: 350, lz: -1060, rotateAng: 0, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '045-12', type: 'equ', id: '045-12', name: '测试数据2', x: 583, y: 0, z: -486, lx: 583, ly: 350, lz: -486, rotateAng: 0, modelName: 'mTwo', scale: '0.03', scaleX: '0.015' },
  { equID: '031-14', type: '', id: '031-14', name: '测试数据6', x: -613, y: 0, z: -824, lx: -613, ly: 350, lz: -824, rotateAng: 0, modelName: 'mSix', scale: '0.03', scaleX: '0.015' },
  { equID: '031-13', type: 'equ', id: '031-13', name: '测试数据1', x: 580, y: 0, z: 1429, lx: 480, ly: 280, lz: 1610, rotateAng: Math.PI / 1, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '036-07', type: 'equ', id: '036-07', name: '测试数据1', x: 580, y: 0, z: 2068, lx: 480, ly: 280, lz: 2250, rotateAng: Math.PI / 1, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '102-1', type: 'equ', id: '102-1', name: '测试数据1', x: 580, y: 0, z: 2707, lx: 480, ly: 280, lz: 2880, rotateAng: Math.PI / 1, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '590-18-2', type: 'equ', id: '590-18-2', name: '测试数据1', x: -119, y: 0, z: 1429, lx: -30, ly: 280, lz: 1250, rotateAng: 0, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '740-29-2', type: 'equ', id: '740-29-2', name: '测试数据1', x: -121, y: 0, z: 2068, lx: -30, ly: 280, lz: 1880, rotateAng: 0, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '590-18', type: 'equ', id: '590-18', name: '测试数据1', x: -124, y: 0, z: 2713, lx: -30, ly: 280, lz: 2500, rotateAng: 0, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '075-4', type: '', id: '075-4', name: '测试数据3', x: 41, y: 0, z: 901, lx: 41, ly: 280, lz: 901, rotateAng: Math.PI / -2, modelName: 'mThr', scale: '0.03', scaleX: '0.015' },
  { equID: '122-20', type: '', id: '122-20', name: '测试数据5', x: 0, y: 0, z: 1, lx: 90, ly: 280, lz: 300, rotateAng: 0, modelName: 'mFiv', scale: '0.03', scaleX: '0.015' },
  { equID: '740-42-1', type: '', id: '740-42-1', name: '测试数据4', x: 0, y: 0, z: 3, lx: 0, ly: 3, lz: 3, rotateAng: 0, modelName: 'mFou', scale: '0.03', scaleX: '0.015' },
  { equID: '740-42-2', type: '', id: '740-42-2', name: '测试数据4', x: 0, y: 0, z: 3, lx: 0, ly: 3, lz: 3, rotateAng: 0, modelName: 'mFou', scale: '0.03', scaleX: '0.015' },

  { equID: '740-42-3', type: 'equ', id: '740-42-3', name: '测试数据4', x: -799, y: 0, z: 1430, lx: 0, ly: 3, lz: 3, rotateAng: 0, modelName: 'mEle', scale: '0.03', scaleX: '0.015' },
  { equID: '590-22-02', type: 'equ', id: '590-22-02', name: '测试数据7', x: -799, y: 0, z: 2076, lx: -300, ly: 280, lz: -350, rotateAng: 0, modelName: 'mTwe', scale: '0.03', scaleX: '0.015' },
  { equID: '740-40', type: 'equ', id: '740-40', name: '测试数据8', x: -799, y: 0, z: 2739, lx: 17, ly: 3, lz: 24, rotateAng: 0, modelName: 'mOne', scale: '0.03', scaleX: '0.015' },
  { equID: '590-13', type: 'equ', id: '590-13', name: '测试数据8', x: -830, y: 0, z: -50, lx: 17, ly: 3, lz: 24, rotateAng: 0, modelName: 'mNin', scale: '0.03', scaleX: '0.015' },
  { equID: '036-08-2', type: 'equ', id: '036-08-2', name: '测试数据8', x: -830, y: 0, z: 526, lx: 17, ly: 3, lz: 24, rotateAng: 0, modelName: 'mTen', scale: '0.03', scaleX: '0.015' },
  { equID: '590-22-03', type: '', id: '590-22-03', name: '测试数据8', x: 560, y: 0, z: 700, lx: 17, ly: 3, lz: 24, rotateAng: 0, modelName: 'mEig', scale: '0.03', scaleX: '0.015' },
  { equID: '590-22', type: '', id: '590-22', name: '测试数据7', x: -621, y: 0, z: -673, lx: -300, ly: 280, lz: -350, rotateAng: Math.PI / 1, modelName: 'mSev', scale: '0.03', scaleX: '0.015' }
  // { equID: '590-22', type: '', id: '590-22', name: '测试数据8', x: 560, y: 0, z: 700, lx: 17, ly: 3, lz: 24, rotateAng: 0, modelName: 'mEig', scale: '0.03', scaleX: '0.015' }
]
export { position, demo1,  }
