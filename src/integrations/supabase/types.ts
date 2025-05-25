export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_summary: {
        Row: {
          avg_response_time: number | null
          created_at: string
          date: string
          false_positives: number | null
          id: string
          prediction_accuracy: number | null
          system_health: number | null
          threats_prevented: number | null
          total_threats: number | null
        }
        Insert: {
          avg_response_time?: number | null
          created_at?: string
          date: string
          false_positives?: number | null
          id?: string
          prediction_accuracy?: number | null
          system_health?: number | null
          threats_prevented?: number | null
          total_threats?: number | null
        }
        Update: {
          avg_response_time?: number | null
          created_at?: string
          date?: string
          false_positives?: number | null
          id?: string
          prediction_accuracy?: number | null
          system_health?: number | null
          threats_prevented?: number | null
          total_threats?: number | null
        }
        Relationships: []
      }
      countermeasures: {
        Row: {
          action: string
          created_at: string
          deployment_time: string | null
          description: string | null
          id: string
          impact: string | null
          status: string
          threat_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          deployment_time?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          status?: string
          threat_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          deployment_time?: string | null
          description?: string | null
          id?: string
          impact?: string | null
          status?: string
          threat_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "countermeasures_threat_id_fkey"
            columns: ["threat_id"]
            isOneToOne: false
            referencedRelation: "threat_analysis"
            referencedColumns: ["id"]
          },
        ]
      }
      network_logs: {
        Row: {
          created_at: string
          destination_ip: unknown
          id: string
          payload_size: number | null
          port: number | null
          protocol: string
          raw_data: Json | null
          source_ip: unknown
          timestamp: string
        }
        Insert: {
          created_at?: string
          destination_ip: unknown
          id?: string
          payload_size?: number | null
          port?: number | null
          protocol: string
          raw_data?: Json | null
          source_ip: unknown
          timestamp: string
        }
        Update: {
          created_at?: string
          destination_ip?: unknown
          id?: string
          payload_size?: number | null
          port?: number | null
          protocol?: string
          raw_data?: Json | null
          source_ip?: unknown
          timestamp?: string
        }
        Relationships: []
      }
      threat_analysis: {
        Row: {
          anomaly_score: number | null
          confidence: number
          created_at: string
          description: string | null
          id: string
          isolation_forest_score: number | null
          log_id: string | null
          lstm_score: number | null
          random_forest_prediction: string | null
          severity: string
          status: string
          threat_type: string
        }
        Insert: {
          anomaly_score?: number | null
          confidence: number
          created_at?: string
          description?: string | null
          id?: string
          isolation_forest_score?: number | null
          log_id?: string | null
          lstm_score?: number | null
          random_forest_prediction?: string | null
          severity: string
          status?: string
          threat_type: string
        }
        Update: {
          anomaly_score?: number | null
          confidence?: number
          created_at?: string
          description?: string | null
          id?: string
          isolation_forest_score?: number | null
          log_id?: string | null
          lstm_score?: number | null
          random_forest_prediction?: string | null
          severity?: string
          status?: string
          threat_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "threat_analysis_log_id_fkey"
            columns: ["log_id"]
            isOneToOne: false
            referencedRelation: "network_logs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
