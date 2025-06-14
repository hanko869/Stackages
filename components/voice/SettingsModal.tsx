import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange: (settings: any) => void;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
}

interface Model {
  model_id: string;
  name: string;
  can_use_style: boolean;
  can_use_speaker_boost: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSettingsChange,
  model,
  setModel,
}) => {
  const [stability, setStability] = useState(0.5);
  const [similarity, setSimilarity] = useState(0.5);
  const [styleExaggeration, setStyleExaggeration] = useState(0.5);
  const [speakerBoost, setSpeakerBoost] = useState(false);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("/api/voice/models");
        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }
        const data = await response.json();
        setModels(data);
        // Set the first model as default
        if (data.length > 0) {
          setModel(data[0].model_id);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  useEffect(() => {
    onSettingsChange({
      stability,
      similarity,
      styleExaggeration,
      speakerBoost,
      model,
    });
  }, [
    stability,
    similarity,
    styleExaggeration,
    speakerBoost,
    model,
    onSettingsChange,
  ]);

  const selectedModel = models.find((m) => m.model_id === model);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Voice Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="stability" className="text-right">
              Stability
            </Label>
            <Slider
              id="stability"
              min={0}
              max={1}
              step={0.1}
              value={[stability]}
              onValueChange={([value]) => setStability(value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="similarity" className="text-right">
              Similarity
            </Label>
            <Slider
              id="similarity"
              min={0}
              max={1}
              step={0.1}
              value={[similarity]}
              onValueChange={([value]) => setSimilarity(value)}
              className="col-span-3"
            />
          </div>
          {selectedModel?.can_use_style && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="style" className="text-right">
                Style
              </Label>
              <Slider
                id="style"
                min={0}
                max={1}
                step={0.1}
                value={[styleExaggeration]}
                onValueChange={([value]) => setStyleExaggeration(value)}
                className="col-span-3"
              />
            </div>
          )}
          {selectedModel?.can_use_speaker_boost && (
            <div className="flex items-center space-x-2">
              <Switch
                id="speaker-boost"
                checked={speakerBoost}
                onCheckedChange={setSpeakerBoost}
              />
              <Label htmlFor="speaker-boost">Speaker Boost</Label>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Label htmlFor="model">Model</Label>
            <Select onValueChange={setModel} value={model}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((modelOption) => (
                  <SelectItem
                    key={modelOption.model_id}
                    value={modelOption.model_id}
                  >
                    {modelOption.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
