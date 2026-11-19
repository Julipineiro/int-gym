import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  describe("totalDiscounted", () => {
    test("una lista vacía tiene que dar 0", () => {
      const resultadoObtenido = list.totalDiscounted();
      const resultadoEsperado = 0;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("sumar las cuotas con el descuento aplicado", () => {
      const socio1 = new Member({
        name: "Bruno Silva",
        documentId: "11111111",
        plan: "basic",
        monthlyFee: 1000,
      });
      socio1.discount = 10;
      const socio2 = new Member({
        name: "Carla Núñez",
        documentId: "22222222",
        plan: "basic",
        monthlyFee: 500,
      });
      list.add(socio1);
      list.add(socio2);
      const resultadoObtenido = list.totalDiscounted();
      const resultadoEsperado = 1400;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });
  });

  describe("updateFee", () => {
    test("cambiar la cuota del socio", () => {
      list.add(member);
      list.updateFee("12345678", 2000);
      const resultadoObtenido = member.monthlyFee;
      const resultadoEsperado = 2000;
      expect(resultadoObtenido).toBe(resultadoEsperado);
    });

    test("dar error si el socio no existe", () => {
      list.add(member);
      expect(() => list.updateFee("99999999", 2000)).toThrow(
        "No existe un socio con ese documento.",
      );
    });
    
    test("debería dar error si la cuota no es válida", () => {
      list.add(member);
      expect(() => list.updateFee("12345678", 0)).toThrow(
        "La cuota mensual debe ser mayor que 0.",
      );
    });
  });
});


