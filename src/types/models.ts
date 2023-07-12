import { Types, Document, Model } from "mongoose";
import {
  BuildingBlock,
  BusinessModel,
  PricingModel,
  Role,
  ValueSharing,
  Architecture,
  DecisionProcess,
  Direction,
  InfrastructureService,
  Perimeter,
  Requirement,
} from "./prometheus-x";

export interface AllSchemas {
  schema_version: string;

  /**
   * JSON-LD Self Description
   */
  jsonld: string;
}

export interface IDataOffering extends Document, AllSchemas {
  /**
   * Title / Name of the data offering
   */
  title: string;

  /**
   * Type of data in the offering
   */
  dataType: string;

  /**
   * Size of the data in the offering
   */
  dataSize: string;

  /**
   * Description of the data offering
   */
  description: string;

  /**
   * URI Identifier
   * Same as url
   */
  identifier: string;

  /**
   * License applied on the data offering
   */
  license: string;

  /**
   * Publisher of the data offering
   */
  publisher: string;

  /**
   * ODRL Policies applied on the data offering
   */
  hasPolicy: string[];

  /**
   * Participant DID offering the data offering
   */
  offeredBy: IParticipant[];

  /**
   * DCAT Terms periodicity URI string
   */
  accrualPeriodicity: string;

  businessModel: BusinessModel;
}

export interface IEcosystem extends Document, AllSchemas {
  /**
   * Data ecosystem name
   */
  name: string;

  /**
   * Purposes & goals of the data ecosystem
   */
  purposeAndGoals: {
    keyPurpose: string;
    principles: string[];
    useCases: string[];
  };

  /**
   * Roles and responsibilities of the stakeholders
   * within the data ecosystem
   */
  rolesAndResponsibilities: {
    stakeholders: {
      /**
       * Becomes IParticipant when populated
       */
      organisation: Types.ObjectId;

      /**
       * Role of the organisation, usually a JSON URI from PTX references repo
       */
      role: string;

      /**
       * Data offerings of the organisation for the current data ecosystem
       * ref: IDataOffering
       */
      dataOfferings: Types.ObjectId[];

      /**
       * Services offerings of the organisation for the current data ecosystem
       * ref: IServiceOffering
       */
      serviceOfferings: Types.ObjectId[];
    }[];
  };

  businessLogic: {
    businessModel: BusinessModel;

    payingParties: {
      direction: Direction[];
      payers: Role[];
    };

    businessCase: {
      definition: string;
    };
    ecosystemSharing: {
      role: Role;
      valueSharing: {
        businessModel: BusinessModel;
        valueNetwork: {
          direction: Direction;
        };
        payers: Role[];
      };
      revenueModel: {
        businessModel: BusinessModel[];
        payingParties: {
          direction: Direction[];
          payers: Role[];
        };
      };
      benefits: ValueSharing[];
      costs: ValueSharing[];
    };
  };
  dataValue: {
    pricingModel: PricingModel;
    dataValueSolution: {
      /**
       * Ref Participant
       */
      provider: Types.ObjectId;

      /**
       * Ref Participant
       */
      offering: Types.ObjectId;

      buildingBlock: BuildingBlock;
    };
    dataNetworkSolutions: {
      type: "buy" | "rent" | "build";

      /**
       * ref Participant
       */
      pays: Types.ObjectId[];
    };
    levelOfCommitment: string[];
  };
  governance: {
    governancePrinciples: string[];
    decisionModel: {
      perimeter: Perimeter;
      decisionProcess: DecisionProcess;
    };
  };
  dataServicesInfrastructure: {
    infrastructureServices: InfrastructureService[];
    dataUsageControl: string[];
    consentManagement: string[];
    dataQuality: string[];
    operationalMonitoring: string[];
    issuesQuestions: string;
    links: string[];
  };
  systemDesignAndArchitecture: {
    systemPrinciples: {
      buildingBlocks: BuildingBlock[];
      requirements: Requirement[];
      architecture: Architecture[];
    };
    metadataFormats: {
      name: string;
      link: string;
    };
  };
  functionalRequirements: {
    technicalInterfaces: {
      name: string;
      link: string;
      evolutionType: string;
    }[];
    acIdentities: BuildingBlock[];
    dataUsageControlSolutions: BuildingBlock[];
    transactionManagement: BuildingBlock[];
    dataGovernanceSolution: BuildingBlock[];
  };
  informationManagement: {
    dataServices: BuildingBlock[];
    dataQuality: BuildingBlock[];
  };
  security: {
    threatAssessment: {
      methods: string[];
      standards: string[];
      threats: string[];
      securityObjectives: string[];
    };
    riskManagementTools: BuildingBlock[];
  };
  privacyAndPersonalData: {
    inclusionPersonalData: boolean;
    PersonalDataManagementSolution: BuildingBlock[];
  };
}

export interface IParticipant extends Document, AllSchemas {
  hasLegallyBindingName: string;

  /**
   * DID identifier
   */
  identifier: string;

  /**
   * @type schema:PostalAddress
   */
  address: {
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    streetAddress: string;
  };

  url: string;

  description: string;

  /**
   * @type gax-participant:hasBusinessIdentifier
   */
  hasBusinessIdentifier: string;

  /**
   * Sub participants
   * ref: IParticipant
   * @type gax-participant:hasMemberParticipant
   */
  hasMemberParticipant: Types.ObjectId[] | IParticipant[];

  /**
   * Logo
   * @type gax-participant:hasLogo
   */
  hasLogo: string;

  /**
   * @type schema:ContactPoint
   */
  contactPoint: {
    email: string;
    telephone: string;
    contactType: string;
  }[];

  /**
   * @type gax-participant:hasCompanyType
   */
  hasCompanyType: string;

  /**
   * @type gax-participant:hasPhoneNumber
   */
  hasPhoneNumber: string;

  /**
   * @type: gax-participant:hasMemberPerson
   */
  hasMemberPerson: {
    name: string;
    email: string;
  }[];

  email: string;

  password: string;
}

export interface IParticipantModel extends Model<IParticipant> {
  validatePassword(password: string): Promise<boolean>;
}

export interface IServiceOffering extends Document, AllSchemas {
  title: string;
  description: string;
  landingPage: string;
  keywords: string[];

  /**
   * @type dcat:distribution
   */
  distribution: string[];

  /**
   * DCAT Terms periodicity URI string
   * @type dcterms:accrualPeriodicity
   */
  accrualPeriodicity: string;

  /**
   * @type dcterms:subject
   */
  subject: string;

  /**
   * @type dcterms:spatial
   */
  spatial: string;

  /**
   * @type dcat:theme
   */
  theme: string;

  /**
   * @type dcat:temporalResolution
   */
  temporalResolution: string;

  /**
   * JSON-LD reference to the business model.
   * Usually coming from Prometheus-X reference models.
   */
  businessModel: string;

  /**
   * Participants offering the service
   */
  offeredBy: Types.ObjectId[];
}
