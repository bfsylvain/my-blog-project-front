function useDateTransform() {
  const frenchDateLong = (value: string) => {
    const date = new Date(value);
    const adjustedDate = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
    }).format(date);
    return adjustedDate;
  };
  const frenchDateShort = (value: number | string) => {
    const date = new Date(value);
    const adjustedDate = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "short",
    }).format(date);
    return adjustedDate;
  }

  return {
    frenchDateLong,
    frenchDateShort
  };
}

export default useDateTransform;
