import { FlatList, View } from "react-native";
import { sampleBatches } from "../../data/sample-batches";
import { BatchCard } from "./batch-card";

export interface BatchListProps {
  onViewDetails?: (id: string) => void;
  onApproveTransfer?: (id: string) => void;
}

export function BatchList({ onViewDetails, onApproveTransfer }: BatchListProps) {
  return (
    <FlatList
      accessibilityRole="list"
      data={sampleBatches}
      keyExtractor={(i) => i.id}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <BatchCard item={item} onViewDetails={onViewDetails} onApproveTransfer={onApproveTransfer} />
      )}
    />
  );
}

export default BatchList;
