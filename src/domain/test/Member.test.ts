import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow();
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow();
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow();
  });

  test("reject a monthly fee that is not a number", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("show the member as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });

   describe("discount", () => {
    test("descuento por defecto 0", () => {
      const resultadoObtenido = member.discount;
      const resultadoEsperado = 0;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("guardar un descuento válido", () => {
      member.discount = 10;
      const resultadoObtenido = member.discount;
      const resultadoEsperado = 10;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("aceptar un descuento de 100", () => {
      member.discount = 100;
      const resultadoObtenido = member.discount;
      const resultadoEsperado = 100;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("dar error con un descuento negativo", () => {
      expect(() => (member.discount = -1)).toThrow(
        "El descuento debe ser un entero entre 0 y 100.",
      );
    });

    test("dar error con un descuento mayor que 100", () => {
      expect(() => (member.discount = 101)).toThrow(
        "El descuento debe ser un entero entre 0 y 100.",
      );
    });

    test("dar error con decimales", () => {
      expect(() => (member.discount = 10.5)).toThrow(
        "El descuento debe ser un entero entre 0 y 100.",
      );
    });
  });

  describe("discountedFee", () => {
    test("sin descuento devolver la cuota completa", () => {
      const resultadoObtenido = member.discountedFee;
      const resultadoEsperado = 1500;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("con 10% de descuento devolver 1350", () => {
      member.discount = 10;
      const resultadoObtenido = member.discountedFee;
      const resultadoEsperado = 1350;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });
  });

  describe("toString", () => {
    test("debería mostrar el descuento cuando es mayor que 0", () => {
      member.discount = 10;
      const resultadoObtenido = member.toString();
      const resultadoEsperado =
        "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento: 10%";
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });
  });
});
