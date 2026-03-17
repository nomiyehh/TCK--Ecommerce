/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Whole Chicken With Skin',
    category: 'Fresh Chicken',
    pricePerKg: 220,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Fresh farm chicken with skin, perfect for roasting.',
    isFresh: true,
  },
  {
    id: '2',
    name: 'Whole Chicken Without Skin',
    category: 'Fresh Chicken',
    pricePerKg: 240,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606728035253-49e1967039c6?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Fresh farm chicken without skin, lean and healthy.',
    isFresh: true,
  },
  {
    id: '3',
    name: 'Chicken Curry Cut',
    category: 'Fresh Chicken',
    pricePerKg: 260,
    rating: 4.7,
    image: 'https://ais-pre-jnaawi2uoeyf34cckluois-469080572290.asia-southeast1.run.app/curry-cut.png',
    description: 'Perfectly cut pieces for your traditional chicken curry.',
    isFresh: true,
  },
  {
    id: '4',
    name: 'Chicken Breast Boneless',
    category: 'Fresh Chicken',
    pricePerKg: 450,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Tender and juicy boneless breast pieces.',
    isFresh: true,
  },
  {
    id: '5',
    name: 'Chicken Wings',
    category: 'Fresh Chicken',
    pricePerKg: 280,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Fresh chicken wings, ideal for snacks and starters.',
  },
  {
    id: '6',
    name: 'Chicken Drumsticks',
    category: 'Fresh Chicken',
    pricePerKg: 350,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Meaty drumsticks for your favorite recipes.',
  },
  {
    id: '7',
    name: 'Chicken Keema',
    category: 'Fresh Chicken',
    pricePerKg: 480,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Finely minced chicken for kebabs and keema curry.',
  },
  {
    id: '8',
    name: 'Marinated Tandoori Chicken',
    category: 'Marinated Chicken',
    pricePerKg: 380,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'Ready to grill tandoori marinated chicken.',
  },
  {
    id: '9',
    name: 'Farm Fresh Eggs (Dozen)',
    category: 'Eggs',
    pricePerKg: 80,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&q=80&w=400&h=300',
    description: 'High quality farm fresh eggs.',
  },
  {
    id: '10',
    name: 'Family Combo Pack',
    category: 'Combo Packs',
    pricePerKg: 850,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400&h=300',
    description: '2kg Curry Cut + 500g Boneless + 1 Dozen Eggs.',
  }
];

export const CATEGORIES = [
  'All',
  'Fresh Chicken',
  'Marinated Chicken',
  'Ready to Cook',
  'Eggs',
  'Combo Packs'
];

export const REVIEWS = [
  {
    id: '1',
    name: 'Rahul Sharma',
    rating: 5,
    comment: 'The quality of chicken is unmatched. Very fresh and hygienic.'
  },
  {
    id: '2',
    name: 'Priya Patel',
    rating: 5,
    comment: 'Love the customization options. The curry cut is perfect every time.'
  },
  {
    id: '3',
    name: 'Amit Verma',
    rating: 4,
    comment: 'Fast delivery and great packaging. Highly recommended for local orders.'
  }
];
