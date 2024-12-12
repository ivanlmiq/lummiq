import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Workbook } from "exceljs";
import { saveAs } from 'file-saver';
import { PWD_WORDS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export const generateWordBasedPassword = (
  wordCount: number,
  options: {
    addNumbersAndSymbols?: boolean;
    camelCase?: boolean;
    separator?: string;
    randomCase?: boolean;
  } = {}
): string => {
  const {
    addNumbersAndSymbols = false,
    camelCase = false,
    separator = "",
    randomCase = false,
  } = options;

  const words = PWD_WORDS;

  // Randomly select the words
  const selectedWords = Array.from(
    { length: wordCount },
    () => words[Math.floor(Math.random() * words.length)]
  );

  // Shuffle selected words for added randomness
  const shuffledWords = selectedWords.sort(() => 0.5 - Math.random());

  // Apply CamelCase or separator if needed
  let password = shuffledWords
    .map((word) => {
      if (camelCase) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(separator);

  // Apply random casing to characters if required
  if (randomCase) {
    password = password
      .split("")
      .map((char) =>
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }

  // Optionally add numbers and symbols for extra security
  if (addNumbersAndSymbols) {
    const number = Math.floor(Math.random() * 100);
    const specialChars = "!@#$%^&*";
    const specialChar =
      specialChars[Math.floor(Math.random() * specialChars.length)];
    password += `${number}${specialChar}`;
  }

  return password;
};

export const downloadExcelTemplate = async () => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("Students Template");

  worksheet.columns = [
    { header: "Name", key: "name", width: 20, },
    { header: "Email", key: "email", width: 30 },
    { header: "Pin", key: "pin", width: 10 },
    { header: "Phone", key: "phone", width: 15, },
    { header: "Genre", key: "genre", width: 8, },
  ];

  worksheet.addRow({
    name: "John Doe",
    email: "johndoe@example.com",
    pin: "12345",
    phone: "123-456-7890",
    genre: "MALE",
  });

  worksheet.protect('', {
    selectLockedCells: true,
    selectUnlockedCells: true,
  });

  worksheet.columns.forEach((column) => {
    column.eachCell!((cell, rowNumber) => {
      if (rowNumber > 1) cell.protection = { locked: false };
    });

    for (let i = 2; i <= 1000; i++) {
      const cell = worksheet.getCell(`${column.letter}${i}`);
      cell.protection = { locked: false };

      if (column.key === 'genre') {
        cell.dataValidation = {
          type: 'list',
          formulae: ['"MALE,FEMALE"'],
          showErrorMessage: true,
          errorTitle: 'Invalid Genre',
          error: 'Please select either MALE or FEMALE',
        };
      }

    }

  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "students_template.xlsx");
};
