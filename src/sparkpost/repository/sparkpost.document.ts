import { Document } from 'mongoose';
import { Sparkpost } from '../interfaces/Sparkpost';

export interface SparkpostDocument extends Sparkpost, Document {}
