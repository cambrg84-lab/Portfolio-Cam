-- Add new project cards for Design Graphique, 3D, and Jeu Vidéo categories
INSERT INTO public.projects (title, description, category, image_url, project_url, featured, order_index) VALUES
('Identité Visuelle - Studio Créatif', 'Création d''une identité de marque complète avec logo, charte graphique et supports de communication', 'graphic_design', '/placeholder.svg?height=600&width=800', NULL, true, 7),
('Environnement 3D Futuriste', 'Modélisation et rendu d''un environnement sci-fi détaillé', '3d', '/placeholder.svg?height=600&width=800', NULL, true, 8),
('Concept Art - RPG Fantasy', 'Design de personnages et environnements pour un jeu de rôle fantastique', 'video_game', '/placeholder.svg?height=600&width=800', NULL, true, 9);