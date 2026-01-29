import { useState, useEffect } from 'react';

interface HebcalItem {
  title: string;
  date: string;
  category: string;
  hebrew?: string;
  memo?: string;
}

interface HebcalResponse {
  title: string;
  location: {
    title: string;
    city: string;
    tzid: string;
  };
  items: HebcalItem[];
}

interface CandleLightingData {
  candleLighting: {
    time: string;
    date: string;
  } | null;
  havdalah: {
    time: string;
    date: string;
  } | null;
  parashat: string | null;
  hebrewDate: string | null;
  shabbatName: string | null;
  city: string;
}

const GEONAME_IDS: Record<string, number> = {
  minsk: 625144,
  brest: 629634,
  gomel: 627904,
  bobruysk: 629803,
  mogilev: 625665,
};

export function useCandleLighting(city: string = 'minsk') {
  const [data, setData] = useState<CandleLightingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandleLighting = async () => {
      try {
        setLoading(true);
        setError(null);

        const geonameid = GEONAME_IDS[city.toLowerCase()] || GEONAME_IDS.minsk;
        const url = `https://www.hebcal.com/shabbat?cfg=json&geonameid=${geonameid}&M=on&b=18`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch candle lighting times');
        }

        const hebcalData: HebcalResponse = await response.json();

        // Parse the data
        const candleItem = hebcalData.items.find(item => item.category === 'candles');
        const havdalahItem = hebcalData.items.find(item => item.category === 'havdalah');
        const parashatItem = hebcalData.items.find(item => item.category === 'parashat');
        const shabbatItem = hebcalData.items.find(
          item => item.category === 'holiday' && item.memo
        );

        // Extract times from titles (format: "Candle lighting: 17:28")
        const candleTime = candleItem?.title.match(/(\d{2}:\d{2})/)?.[1] || null;
        const havdalahTime = havdalahItem?.title.match(/(\d{2}:\d{2})/)?.[1] || null;

        setData({
          candleLighting: candleTime
            ? {
                time: candleTime,
                date: candleItem!.date,
              }
            : null,
          havdalah: havdalahTime
            ? {
                time: havdalahTime,
                date: havdalahItem!.date,
              }
            : null,
          parashat: parashatItem?.title.replace('Parashat ', '') || null,
          hebrewDate: parashatItem?.hebrew || null,
          shabbatName: shabbatItem?.title || null,
          city: hebcalData.location.city,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching candle lighting times:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandleLighting();
  }, [city]);

  return { data, loading, error };
}
