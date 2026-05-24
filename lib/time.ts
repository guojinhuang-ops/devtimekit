export const formatDateOutputs = (date: Date) => {
  return {
    local: date.toLocaleString(),
    utc: date.toUTCString(),
    iso: date.toISOString()
  };
};

export const parseTimestampInput = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!/^(\d{10}|\d{13})$/.test(trimmed)) {
    return null;
  }

  const numeric = Number(trimmed);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  const ms = trimmed.length === 10 ? numeric * 1000 : numeric;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const parseLocalDateInput = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const date = new Date(trimmed);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};
