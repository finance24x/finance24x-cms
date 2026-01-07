/**
 * Seed Metals, Countries, States, and Cities
 */

import { metals, countries, states, cities } from './data';

export async function seedRateData(strapi: any) {
  console.log('🌱 Seeding Rate Data (Metals, Countries, States, Cities)...');

  try {
    // Seed Metals
    const metalMap = new Map();
    for (const metalData of metals) {
      try {
        const existing = await strapi.documents('api::metal.metal').findOne({
          filters: { slug: { $eq: metalData.slug } },
        });

        if (existing) {
          await strapi.documents('api::metal.metal').update({
            documentId: existing.documentId,
            data: metalData,
            status: 'published',
          });
          metalMap.set(metalData.slug, existing.documentId);
          console.log(`  ✓ Updated Metal: ${metalData.name}`);
        } else {
          const created = await strapi.documents('api::metal.metal').create({
            data: metalData,
            status: 'published',
          });
          metalMap.set(metalData.slug, created.documentId);
          console.log(`  ✓ Created Metal: ${metalData.name}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error processing Metal ${metalData.name}:`, error?.message || error);
      }
    }

    // Seed Countries
    const countryMap = new Map();
    for (const countryData of countries) {
      try {
        const existing = await strapi.documents('api::country.country').findOne({
          filters: { code: { $eq: countryData.code } },
        });

        if (existing) {
          await strapi.documents('api::country.country').update({
            documentId: existing.documentId,
            data: countryData,
            status: 'published',
          });
          countryMap.set(countryData.name, existing.documentId);
          console.log(`  ✓ Updated Country: ${countryData.name}`);
        } else {
          const created = await strapi.documents('api::country.country').create({
            data: countryData,
            status: 'published',
          });
          countryMap.set(countryData.name, created.documentId);
          console.log(`  ✓ Created Country: ${countryData.name}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error processing Country ${countryData.name}:`, error?.message || error);
      }
    }

    // Seed States
    const stateMap = new Map();
    for (const stateData of states) {
      try {
        const countryId = countryMap.get(stateData.country);
        if (!countryId) {
          console.warn(`  ⚠ Country not found: ${stateData.country}`);
          continue;
        }

        const existing = await strapi.documents('api::state.state').findMany({
          filters: { 
            name: { $eq: stateData.name }
          },
          populate: ['country'],
        });

        const existingState = existing.find((s: any) => s.country?.documentId === countryId);

        if (existingState) {
          await strapi.documents('api::state.state').update({
            documentId: existingState.documentId,
            data: {
              name: stateData.name,
              code: stateData.code,
              country: countryId,
            },
            status: 'published',
          });
          stateMap.set(`${stateData.name}-${stateData.country}`, existingState.documentId);
          console.log(`  ✓ Updated State: ${stateData.name}, ${stateData.country}`);
        } else {
          const created = await strapi.documents('api::state.state').create({
            data: {
              name: stateData.name,
              code: stateData.code,
              country: countryId,
            },
            status: 'published',
          });
          stateMap.set(`${stateData.name}-${stateData.country}`, created.documentId);
          console.log(`  ✓ Created State: ${stateData.name}, ${stateData.country}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error processing State ${stateData.name}:`, error?.message || error);
      }
    }

    // Seed Cities
    for (const cityData of cities) {
      try {
        const countryId = countryMap.get(cityData.country);
        const stateId = stateMap.get(`${cityData.state}-${cityData.country}`);
        
        if (!countryId) {
          console.warn(`  ⚠ Country not found: ${cityData.country}`);
          continue;
        }
        if (!stateId) {
          console.warn(`  ⚠ State not found: ${cityData.state}, ${cityData.country}`);
          continue;
        }

        const existing = await strapi.documents('api::city.city').findMany({
          filters: { 
            name: { $eq: cityData.name }
          },
          populate: ['country', 'state'],
        });

        const existingCity = existing.find((c: any) => c.country?.documentId === countryId);

        if (existingCity) {
          await strapi.documents('api::city.city').update({
            documentId: existingCity.documentId,
            data: {
              name: cityData.name,
              state: stateId,
              country: countryId,
            },
            status: 'published',
          });
          console.log(`  ✓ Updated City: ${cityData.name}, ${cityData.state}`);
        } else {
          await strapi.documents('api::city.city').create({
            data: {
              name: cityData.name,
              state: stateId,
              country: countryId,
            },
            status: 'published',
          });
          console.log(`  ✓ Created City: ${cityData.name}, ${cityData.state}`);
        }
      } catch (error: any) {
        console.error(`  ❌ Error processing City ${cityData.name}:`, error?.message || error);
      }
    }

    console.log('✅ Rate Data seeding completed!');
  } catch (error: any) {
    console.error('❌ Fatal error in seedRateData:', error?.message || error);
    throw error;
  }
}

