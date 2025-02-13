export const isEmptyString = (value: string) => {
  if (!value) return false;
  return value.replace(/ /g, "") === "";
};

// slug formatting
export function createSlug(str: string): string {
  if (!str) {
    return ""; // Gérer le cas où la chaîne est vide ou null
  }

  const slug = str
    .normalize("NFD") // Normaliser pour supprimer les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les diacritiques
    .toLowerCase() // Mettre en minuscule
    .replace(/[^a-z0-9 -]/g, "") // Supprimer les caractères non alphanumériques, tirets et espaces
    .trim() // Supprimer les espaces au début et à la fin
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .replace(/-+/g, "-"); // Remplacer les tirets multiples par un seul tiret

  return slug;
}

type ReturnDataValueType = {
  value: string;
  data: { value: string; label: string }[];
};
export function returnDataValue({ data, value }: ReturnDataValueType) {
  return data.find((item) => item.value === value)?.label || "";
}
