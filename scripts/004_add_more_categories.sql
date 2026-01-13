-- Ajout de 3 nouvelles catégories de projets modifiables via Supabase

-- Catégorie 3D
INSERT INTO projects (title, description, category, image_url, link) VALUES
(
  'Modélisation 3D',
  'Créations 3D réalisées avec Blender et autres logiciels de modélisation',
  '3D',
  '/placeholder.svg?height=400&width=600',
  '/categorie/3d'
);

-- Catégorie Design Graphique
INSERT INTO projects (title, description, category, image_url, link) VALUES
(
  'Identité visuelle',
  'Création de logos, chartes graphiques et supports de communication',
  'Design Graphique',
  '/placeholder.svg?height=400&width=600',
  '/categorie/design-graphique'
);

-- Catégorie Jeu Vidéo
INSERT INTO projects (title, description, category, image_url, link) VALUES
(
  'Game Art',
  'Concepts arts et assets créés pour des projets de jeux vidéo',
  'Jeu Vidéo',
  '/placeholder.svg?height=400&width=600',
  '/categorie/jeu-video'
);
