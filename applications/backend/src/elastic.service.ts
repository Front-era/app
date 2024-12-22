import { Injectable } from '@nestjs/common';
import { elasticClient } from './elastic.config';

@Injectable()
export class ElasticSearchService {
  private readonly index = 'projects'; // Elasticsearch index

  // Create Index with Mappings
  async createIndex(): Promise<void> {
    const exists = await elasticClient.indices.exists({ index: this.index });

    if (!exists) {
      await elasticClient.indices.create({
        index: this.index,
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              description: { type: 'text' },
              tags: { type: 'keyword' },
              skillsNeeded: { type: 'keyword' },
              createdAt: { type: 'date' },
              updatedAt: { type: 'date' },
            },
          },
        },
      });
    }
  }

  // Index a Document
  async indexDocument(
    id: string,
    document: Record<string, any>,
  ): Promise<void> {
    await elasticClient.index({
      index: this.index,
      id,
      body: document,
    });
  }

  // Delete a Document
  async deleteDocument(id: string): Promise<void> {
    await elasticClient.delete({
      index: this.index,
      id,
    });
  }

  // Search Documents
  async search(query: string): Promise<any> {
    try {
      const result = await elasticClient.search({
        index: this.index,
        body: {
          query: {
            multi_match: {
              query, // The search query string
              fields: ['title', 'description', 'tags', 'skillsNeeded'], // Fields to search in
            },
          },
        },
      });

      // Return the hits (matching documents)
      return result.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.error('Error searching Elasticsearch:', error);
      throw new Error('Failed to search Elasticsearch');
    }
  }

  // Bulk Index Documents
  async bulkIndex(documents: Array<{ id: string; body: any }>): Promise<void> {
    const body = documents.flatMap((doc) => [
      { index: { _index: this.index, _id: doc.id } },
      doc.body,
    ]);

    await elasticClient.bulk({ refresh: true, body });
  }
}
