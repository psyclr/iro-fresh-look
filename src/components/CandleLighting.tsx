import { Loader2 } from 'lucide-react';
import { useCandleLighting } from '@/hooks/useCandleLighting';
import { useTranslation } from 'react-i18next';

interface CandleLightingProps {
  compact?: boolean;
}

export default function CandleLighting({ compact = false }: CandleLightingProps) {
  const { t } = useTranslation();
  const { data, loading, error } = useCandleLighting('minsk');

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return null; // Тихо скрываем блок при ошибке
  }

  // Compact version for sidebar - minimal design
  if (compact) {
    return (
      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">
            {t('candleLighting.title', 'Зажигание свечей')}
          </h3>
          <p className="text-sm text-muted-foreground">{data?.city}</p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Candle Lighting */}
          {data?.candleLighting && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t('candleLighting.candles', 'Зажигание свечей')}
              </p>
              <p className="text-2xl font-semibold text-foreground">
                {data.candleLighting.time}
              </p>
            </div>
          )}

          {/* Havdalah */}
          {data?.havdalah && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {t('candleLighting.havdalah', 'Авдала')}
              </p>
              <p className="text-2xl font-semibold text-foreground">
                {data.havdalah.time}
              </p>
            </div>
          )}

          {/* Parashat */}
          {data?.parashat && (
            <div className="pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">
                {t('candleLighting.parashat', 'Недельная глава')}
              </p>
              <p className="text-base font-medium text-foreground">
                {data.parashat}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-muted/30 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            <a
              href="https://www.hebcal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Hebcal.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Full version - horizontal layout for wide bar
  return (
    <div className="flex items-center justify-center gap-8">
      {/* Title and City */}
      <div className="flex-shrink-0">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {t('candleLighting.title', 'Зажигание свечей')}
        </h3>
        <p className="text-sm text-muted-foreground">{data.city}</p>
      </div>

      {/* Times - Horizontal Layout */}
      <div className="flex items-center gap-12">
        {/* Candle Lighting */}
        {data.candleLighting && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {t('candleLighting.candles', 'Зажигание свечей')}
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {data.candleLighting.time}
            </p>
          </div>
        )}

        {/* Separator */}
        <div className="h-12 w-px bg-border"></div>

        {/* Havdalah */}
        {data.havdalah && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {t('candleLighting.havdalah', 'Авдала')}
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {data.havdalah.time}
            </p>
          </div>
        )}

        {/* Separator */}
        <div className="h-12 w-px bg-border"></div>

        {/* Parashat */}
        {data.parashat && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">
              {t('candleLighting.parashat', 'Недельная глава')}
            </p>
            <p className="text-base font-medium text-foreground">
              {data.parashat}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
