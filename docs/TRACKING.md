# Tracking, consentement et préparation aux campagnes

Ce document décrit ce qui est en place dans le code et ce qu'il reste à configurer dans les outils (Vercel, Google, Meta).

## Ce que fait le code

| Élément | Fichier | Rôle |
| --- | --- | --- |
| Bandeau cookies | `src/components/tracking/Tracking.tsx` | Accepter / Refuser / Personnaliser, choix gardé 6 mois, lien « Gérer les cookies » en pied de page et dans la politique de confidentialité |
| Consent Mode v2 | `src/lib/analytics.ts` | Mode « basique » : aucun script Google ni Meta n'est chargé avant le consentement ; signaux `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` envoyés à Google |
| GA4 + Google Ads | `src/lib/analytics.ts` | gtag.js chargé après accord, configuré pour GA4 (mesure d'audience) et Google Ads (publicité) |
| Pixel Meta | `src/lib/analytics.ts` | Chargé uniquement avec le consentement « Publicité », révoqué en cas de retrait |
| Vercel Web Analytics | `src/app/layout.tsx` | Statistiques sans cookie, actives dès que l'option est activée dans Vercel |
| SEO | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/page.tsx` | sitemap.xml, robots.txt, données structurées LocalBusiness, canonical sur l'accueil uniquement, image de partage `public/og-rentdriver.png` |

Le bandeau n'apparaît que lorsqu'au moins un identifiant (GA4, Google Ads ou Meta) est renseigné. Le dossier `/imara` (autre site du projet) est exclu du tracking Rent Driver.

## Événements envoyés

Les clics sont détectés automatiquement sur tous les liens `tel:` et `wa.me`. L'emplacement vient de l'attribut `data-track-placement` (sinon de l'`id` de la section).

| Action du visiteur | GA4 | Google Ads | Meta |
| --- | --- | --- | --- |
| Clic « Réserver via WhatsApp » (simulateur) | `generate_lead` (method=whatsapp, lead_intent=reservation, value=prix estimé) | conversion | `Lead` (avec valeur) |
| Clic « Demander un devis sur WhatsApp » (pro) | `generate_lead` (lead_intent=devis) | conversion | `Lead` |
| Clic téléphone (header, hero, menu mobile, footer) | `generate_lead` (method=telephone) | conversion | `Contact` |
| Clic WhatsApp FAQ | `generate_lead` (method=whatsapp) | conversion | `Contact` |
| Choix Particulier / Professionnel | `simulation_start` | — | — |
| Prix calculé par le simulateur | `simulation_complete` (distance_km, value) | — | `SimulationComplete` (événement personnalisé) |

Pour ajouter un nouveau bouton WhatsApp ou téléphone : rien à faire, il est suivi automatiquement. Ajoutez `data-track-placement="nom"` pour le distinguer dans les rapports, et `data-track-intent="reservation"` ou `"devis"` s'il s'agit d'une demande de réservation.

## Variables d'environnement (Vercel → Settings → Environment Variables)

| Variable | Exemple | Où la trouver |
| --- | --- | --- |
| `NEXT_PUBLIC_GA4_ID` | `G-7CCDPNSL3P` (déjà dans le code) | GA4 → Administration → Flux de données → Web |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-123456789` | Google Ads → Objectifs → Conversions → balise |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | `AbCdEfGhIj` | Partie après le `/` dans `send_to` de l'action de conversion (facultatif, voir plus bas) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` | Meta Events Manager → Sources de données → Pixel |
| `NEXT_PUBLIC_SITE_URL` | `https://www.rentdriver.fr` | Facultatif. Domaine principal, `https://www.rentdriver.fr` par défaut |

Les variables `NEXT_PUBLIC_*` sont intégrées au moment du build : **redéployer** après les avoir ajoutées.

## Checklist de mise en route

1. **Vercel**
   - Activer *Analytics* dans l'onglet du projet.
   - Domaines : garder `www.rentdriver.fr` en principal et rediriger `rentdriver.fr` vers lui.
2. **Google Search Console** (propriété déjà vérifiée par la balise meta) : soumettre `https://www.rentdriver.fr/sitemap.xml`.
3. **GA4**
   - Créer la propriété, renseigner `NEXT_PUBLIC_GA4_ID`.
   - Après les premières données : Administration → Événements → marquer `generate_lead` comme **événement clé**.
   - Créer une dimension personnalisée « placement » et « method » (portée événement) pour lire les rapports.
   - Associer GA4 à Google Ads et à Search Console.
4. **Google Ads** — deux options :
   - *Simple* : importer l'événement clé GA4 `generate_lead` comme conversion (ne pas renseigner `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`).
   - *Plus précise* : créer une action de conversion « Site web » de type *Prospect*, renseigner `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`.
   - Ne pas activer les deux comme conversions principales, sinon chaque lead est compté deux fois.
   - Ajouter aussi une conversion « Appels depuis les annonces » (extension d'appel).
5. **Meta**
   - Créer le Pixel, renseigner `NEXT_PUBLIC_META_PIXEL_ID`.
   - Vérifier le domaine `rentdriver.fr` dans le Business Manager.
   - Optimiser les campagnes sur `Lead` ; créer une conversion personnalisée sur `SimulationComplete` si le volume de leads est trop faible au démarrage.
6. **Vérifier** : Google Tag Assistant et Meta Pixel Helper sur le site en production, après avoir cliqué « Tout accepter ».

## Limites connues

- La conversion mesurée est le **clic** vers WhatsApp ou le téléphone, pas la réservation confirmée. Pour remonter les vraies ventes, importer les conversions hors ligne (Google Ads) ou utiliser l'API Conversions (Meta) dans un second temps.
- Les visiteurs qui refusent les cookies ne sont pas comptés dans GA4/Ads/Meta (ils restent visibles dans Vercel Analytics).
