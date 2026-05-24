export type TaiwanCity = {
  name: string;
  displayName: string;
  lat: number;
  lon: number;
};

export const taiwanCities = [
  { name: "基隆市", displayName: "基隆", lat: 25.1276, lon: 121.7392 },
  { name: "臺北市", displayName: "臺北", lat: 25.033, lon: 121.5654 },
  { name: "新北市", displayName: "新北", lat: 25.0169, lon: 121.4628 },
  { name: "桃園市", displayName: "桃園", lat: 24.9937, lon: 121.3009 },
  { name: "新竹市", displayName: "新竹市", lat: 24.8138, lon: 120.9675 },
  { name: "新竹縣", displayName: "新竹縣", lat: 24.839, lon: 121.0177 },
  { name: "苗栗縣", displayName: "苗栗", lat: 24.5602, lon: 120.8214 },
  { name: "臺中市", displayName: "臺中", lat: 24.1477, lon: 120.6736 },
  { name: "彰化縣", displayName: "彰化", lat: 24.0518, lon: 120.5161 },
  { name: "南投縣", displayName: "南投", lat: 23.9609, lon: 120.9719 },
  { name: "雲林縣", displayName: "雲林", lat: 23.7092, lon: 120.4313 },
  { name: "嘉義市", displayName: "嘉義市", lat: 23.4801, lon: 120.4491 },
  { name: "嘉義縣", displayName: "嘉義縣", lat: 23.4518, lon: 120.2555 },
  { name: "臺南市", displayName: "臺南", lat: 22.9999, lon: 120.2269 },
  { name: "高雄市", displayName: "高雄", lat: 22.6273, lon: 120.3014 },
  { name: "屏東縣", displayName: "屏東", lat: 22.5519, lon: 120.5488 },
  { name: "宜蘭縣", displayName: "宜蘭", lat: 24.7021, lon: 121.7378 },
  { name: "花蓮縣", displayName: "花蓮", lat: 23.9872, lon: 121.6015 },
  { name: "臺東縣", displayName: "臺東", lat: 22.7972, lon: 121.0714 },
  { name: "澎湖縣", displayName: "澎湖", lat: 23.5711, lon: 119.5793 },
  { name: "金門縣", displayName: "金門", lat: 24.4321, lon: 118.3171 },
  { name: "連江縣", displayName: "連江", lat: 26.1602, lon: 119.9517 },
] as const satisfies readonly TaiwanCity[];

export const findTaiwanCity = (cityName: string) =>
  taiwanCities.find((city) => city.name === cityName);
