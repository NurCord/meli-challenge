import DnaSequence from "../models/DnaSequence";

export const getStats = async () => {
  try {
    const [count_mutant_dna, count_human_dna] = await Promise.all([
      DnaSequence.count({
        where: {
          isMutant: true,
        },
      }),
      DnaSequence.count({
        where: {
          isMutant: false,
        },
      }),
    ]);
    const ratio =
      count_human_dna === 0 ? 1 : count_mutant_dna / count_human_dna;
    const response = {
      count_mutant_dna,
      count_human_dna,
      ratio,
    };
    return response;
  } catch (error) {
    throw new Error("Error al obtener las estadísticas");
  }
};
