// Mapeia palavras-chave do nome da categoria a um ícone Lucide apropriado.
// Usado como fallback quando uma categoria não possui um ícone explicitamente cadastrado.

const KEYWORD_TO_ICON: Array<[RegExp, string]> = [
  [/\b(tod[oa]s|all)\b/i, 'LayoutGrid'],
  [/aliment|restaurante|food|comida|gastronom|lanchonete|pizza|hamb/i, 'UtensilsCrossed'],
  [/caf[eé]|coffee|padaria|bakery/i, 'Coffee'],
  [/bar\b|drink|bebida|pub|vinho/i, 'Wine'],
  [/distribuidora|atacad/i, 'PackageOpen'],
  [/embalag/i, 'Package'],
  [/loja|shop|store|ecommerce|e-commerce|com[eé]rcio|varejo/i, 'ShoppingBag'],
  [/acess[oó]rio|moda|fashion|roupa|vestu[aá]rio|boutique/i, 'Shirt'],
  [/cosm[eé]tic|perfum/i, 'Sparkles'],
  [/beleza|sal[aã]o|barbearia|barber|est[eé]tica|spa/i, 'Scissors'],
  [/sa[uú]de|cl[ií]nica|m[eé]dic|hospital|odont|dentist/i, 'Stethoscope'],
  [/farm[aá]cia|drogaria|pharma/i, 'Pill'],
  [/fitness|academia|gym|treino|cross/i, 'Dumbbell'],
  [/yoga|medita|wellness|bem[- ]?estar/i, 'HeartPulse'],
  [/esporte|sport|futebol|basquete/i, 'Trophy'],
  [/educa|escola|curso|aula|ensino|school|university|faculdade/i, 'GraduationCap'],
  [/livr|biblio|leitura|book/i, 'BookOpen'],
  [/erp|sistema|software|saas|app\b/i, 'Database'],
  [/tecnolog|tech|startup/i, 'Cpu'],
  [/desenvolv|programa|c[oó]digo|code|dev\b/i, 'Code'],
  [/design|criativ|art\b|portfolio|portif[oó]lio|estudio|studio/i, 'Palette'],
  [/foto|fotograf|photo/i, 'Camera'],
  [/v[ií]deo|filme|cinema|produtora|streaming/i, 'Film'],
  [/m[uú]sic|banda|dj|audio|podcast/i, 'Music'],
  [/jog|game|gaming/i, 'Gamepad2'],
  [/im[oó]ve|imobili|real ?estate|aluguel|casa|apartament/i, 'Home'],
  [/esquadria|porta|janela/i, 'DoorOpen'],
  [/constru|reforma|obra/i, 'HardHat'],
  [/arquitet/i, 'Compass'],
  [/engenharia|epi'?s?\b|seguran[cç]a do trabalho/i, 'HardHat'],
  [/assist[eê]ncia|oficina|conserto|manuten/i, 'Wrench'],
  [/bicicl|bike/i, 'Bike'],
  [/empilhad|elevador|guindaste/i, 'Forklift'],
  [/autom[oó]ve|carro|ve[ií]culo|auto\b|car\b/i, 'Car'],
  [/viag|turismo|travel|hotel|pousada|hosped/i, 'Plane'],
  [/floricultura|flor\b/i, 'Flower'],
  [/evento|festa|casamento|wedding|cerimon/i, 'PartyPopper'],
  [/religios|igreja|church/i, 'Church'],
  [/pet|animal|veterin[aá]ri/i, 'PawPrint'],
  [/jardim|paisag|garden|plant/i, 'Leaf'],
  [/energia solar|solar/i, 'Sun'],
  [/energia|el[eé]tric/i, 'Zap'],
  [/limpeza|clean/i, 'Sparkles'],
  [/advog|jur[ií]dic|law|legal/i, 'Scale'],
  [/financ|cont[aá]bil|contador|bank|invest/i, 'Landmark'],
  [/consult|coach|mentor|organiza/i, 'Briefcase'],
  [/marketing|ag[eê]ncia|publicidade|m[ií]dia/i, 'Megaphone'],
  [/blog|not[ií]cia|news|jornal|revista/i, 'Newspaper'],
  [/associa|institui|ong|social|caridade/i, 'Users'],
  [/transport|log[ií]stica|delivery|entrega/i, 'Truck'],
  [/ind[uú]stri|f[aá]brica|manufatura/i, 'Factory'],
  [/agro|fazenda|rural|agricultura|agr[ií]col|trator/i, 'Tractor'],
];

export const getCategoryIcon = (
  explicitIcon?: string | null,
  name?: string | null,
): string => {
  if (explicitIcon && String(explicitIcon).trim()) {
    const trimmed = String(explicitIcon).trim();
    return trimmed.startsWith('lucide:') ? trimmed.split(':')[1] : trimmed;
  }
  const n = (name || '').toLowerCase();
  for (const [regex, icon] of KEYWORD_TO_ICON) {
    if (regex.test(n)) return icon;
  }
  return 'LayoutTemplate';
};
