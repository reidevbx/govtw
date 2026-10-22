// 示範資料：服務內容、機關、費用皆為虛構，非實際申辦規定

export interface Service {
  id: string
  category: string
  name: string
  summary: string
  agency: string
  method: string
  fee: string
  duration: string
  steps: string[]
  online: boolean
}

export const services: Service[] = [
  {
    id: 'childcare-allowance',
    category: 'birth',
    name: '育兒津貼申請（示範）',
    summary: '未滿 2 歲幼兒家庭可申請每月育兒津貼。',
    agency: '戶籍所在地鄉鎮市區公所',
    method: '線上申辦、臨櫃辦理',
    fee: '免費',
    duration: '約 10 個工作天',
    steps: ['準備父母與幼兒身分證明文件', '線上填寫申請表或至公所臨櫃', '審核通過後按月撥款'],
    online: true,
  },
  {
    id: 'birth-registration',
    category: 'birth',
    name: '出生登記（示範）',
    summary: '新生兒出生後 60 日內辦理出生登記。',
    agency: '戶政事務所',
    method: '臨櫃辦理',
    fee: '免費',
    duration: '當日完成',
    steps: ['攜帶出生證明書與父母身分證', '至任一戶政事務所辦理', '領取新生兒戶籍資料'],
    online: false,
  },
  {
    id: 'household-transcript',
    category: 'identity',
    name: '電子戶籍謄本申請（示範）',
    summary: '線上申請電子戶籍謄本，免臨櫃。',
    agency: '內政部戶政司',
    method: '線上申辦',
    fee: '每份新臺幣 15 元',
    duration: '即時',
    steps: ['以自然人憑證或行動身分識別登入', '選擇謄本種類與份數', '線上繳費後下載'],
    online: true,
  },
  {
    id: 'passport',
    category: 'travel',
    name: '護照申請（示範）',
    summary: '首次申請或換發普通護照。',
    agency: '外交部領事事務局',
    method: '臨櫃辦理、委託代辦',
    fee: '新臺幣 1,300 元',
    duration: '約 4 個工作天',
    steps: ['填寫普通護照申請書', '準備照片與身分證明文件', '至領務局或辦事處遞件'],
    online: false,
  },
  {
    id: 'income-tax',
    category: 'tax',
    name: '綜合所得稅申報（示範）',
    summary: '每年 5 月申報前一年度綜合所得稅。',
    agency: '財政部',
    method: '線上申辦、臨櫃辦理',
    fee: '免費',
    duration: '即時',
    steps: ['下載報稅軟體或使用網頁版', '以憑證或行動身分識別登入', '確認所得資料並送出申報'],
    online: true,
  },
  {
    id: 'rent-subsidy',
    category: 'home',
    name: '租屋補貼申請（示範）',
    summary: '符合資格之租屋家庭可申請每月租金補貼。',
    agency: '內政部國土管理署',
    method: '線上申辦、郵寄',
    fee: '免費',
    duration: '約 30 個工作天',
    steps: ['確認申請資格', '線上填寫申請資料並上傳租約', '審核通過後按月撥款'],
    online: true,
  },
]

export const recommended = ['household-transcript', 'income-tax', 'childcare-allowance', 'passport']
